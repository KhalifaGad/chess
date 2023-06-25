import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { LocalDataPersistenceService } from "src/app/services";
import { BoardEvent, OfflineManagerEvent, OfflineManagerEventName } from "src/app/types";
import { GAME_STATE_LOCAL_STORAGE_KEY } from "src/constants";
import { environment } from "src/environments/environment";


@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent {
  @ViewChild('darkSide') darkSide?: ElementRef<HTMLIFrameElement>;
  @ViewChild('lightSide') lightSide?: ElementRef<HTMLIFrameElement>;
  iframeURL: SafeResourceUrl = this.getBoardSafeUrl();
  isGameFinished = false;

  constructor(private sanitizer: DomSanitizer, private localDataService: LocalDataPersistenceService) {
    console.log('environment', environment);
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent<BoardEvent>) {
    if (event.origin !== window.location.origin) return;
    if (!Object(event.data).hasOwnProperty('color') || !Object(event.data).hasOwnProperty('move')) return

    this.onMoveEvent(event.data);
  }

  onMoveEvent(event: BoardEvent) {
    const eventPayload: OfflineManagerEvent = {
      isLightSide: event.color !== 'white',
      opponentMove: event.move,
      eventName: OfflineManagerEventName.MOVE,
    }
    if (event.color === 'white') {
      this.reflectMove(eventPayload, this.darkSide);
    } else {
      this.reflectMove(eventPayload, this.lightSide);
    }

    if (event.checkmate) {
      // using setTimeout just to fire the alert after updating the two boards!.
      setTimeout(() => {
        this.onCheckmate(event.color);
      });
    }
  }

  onCheckmate(winner: 'white' | 'black') {
    alert(`Checkmate! ${winner} wins!`);
    this.isGameFinished = true;
  }

  reflectMove(event: OfflineManagerEvent, boardRef?: ElementRef<HTMLIFrameElement>) {
    boardRef?.nativeElement.contentWindow?.postMessage(event, this.iframeURL);
  }

  lightSideLoadListener() {
    if (!this.lightSide) return
    const payload = {
      isLightSide: true,
      eventName: OfflineManagerEventName.ASSIGN
    }
    this.lightSide.nativeElement.contentWindow?.postMessage(payload, this.iframeURL);
  }

  darkSideLoadListener() {
    const payload = {
      isLightSide: false,
      eventName: OfflineManagerEventName.ASSIGN
    }
    this.darkSide?.nativeElement.contentWindow?.postMessage(payload, this.iframeURL);
  }

  newGame() {
    this.lightSide?.nativeElement.contentWindow?.postMessage({
      eventName: OfflineManagerEventName.RESET,
      isLightSide: true
    }, this.iframeURL);

    this.darkSide?.nativeElement.contentWindow?.postMessage({
      eventName: OfflineManagerEventName.RESET,
      isLightSide: false
    }, this.iframeURL);

    this.isGameFinished = false;
    this.localDataService.remove(GAME_STATE_LOCAL_STORAGE_KEY);
  }

  getBoardSafeUrl() {
    const OFFLINE_BOARD_URL = `${environment.host}/offline-board`
    return this.sanitizer.bypassSecurityTrustResourceUrl(OFFLINE_BOARD_URL);
  }
}
