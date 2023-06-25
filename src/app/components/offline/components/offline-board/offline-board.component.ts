import { AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { BoardComponent } from "src/app/components/board/board.component";
import { LocalDataPersistenceService } from "src/app/services";
import { BoardEvent, GameState, OfflineManagerEvent, OfflineManagerEventName } from "src/app/types";
import { GAME_STATE_LOCAL_STORAGE_KEY } from "src/constants";

@Component({
  selector: 'app-offline-board',
  templateUrl: './offline-board.component.html',
  styleUrls: ['./offline-board.component.scss']
})
export class OfflineBoardComponent implements AfterViewInit {
  isLightSide = true;
  shouldPlay = false;
  isLastStateLoaded = false;
  loadedStateMoveColor = '';
  @ViewChild('board', { static: false }) board?: BoardComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef, private localDataService: LocalDataPersistenceService) {
  }

  get colorTurn() {
    if (this.isLightSide) {
      return this.shouldPlay ? 'black' : 'white';
    } else {
      return this.shouldPlay ? 'white' : 'black';
    }
  }

  ngAfterViewInit() {
    if (!this.board || this.isLastStateLoaded) return;
    this.isLastStateLoaded = true;
    const stringifiedGameState = this.localDataService.get(GAME_STATE_LOCAL_STORAGE_KEY);
    if (!stringifiedGameState) return;
    const gameState: GameState = JSON.parse(stringifiedGameState);
    this.board?.setFEN(gameState.fen);
    this.loadedStateMoveColor = gameState.lastMoveColor;
    this.changeDetectorRef.detectChanges();
  }

  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent<OfflineManagerEvent>) {
    if (event.origin !== window.location.origin) return;
    if (!Object(event.data).hasOwnProperty('eventName')) return
    this.onOfflineEvent(event.data);
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent) {
    if (this.isLightSide) return;
    const gameFEN = this.board?.getFEN();
    if (!gameFEN) return;

    this.localDataService.add(GAME_STATE_LOCAL_STORAGE_KEY, {
      fen: gameFEN,
      lastMoveColor: this.colorTurn,
    });
  }

  onOfflineEvent(event: OfflineManagerEvent) {
    if (event.eventName === OfflineManagerEventName.MOVE) {
      this.onMove(event);
    } else if (event.eventName === OfflineManagerEventName.ASSIGN) {
      this.onAssignColor(event);
    } else {
      this.onReset(event);
    }
    this.changeDetectorRef.detectChanges();
  }

  onMove(event: OfflineManagerEvent) {
    this.board?.simulateMove(event.opponentMove);
    this.shouldPlay = true;
  }

  onAssignColor(event: OfflineManagerEvent) {
    this.isLightSide = event.isLightSide;
    if (!this.loadedStateMoveColor) {
      this.shouldPlay = event.isLightSide;
      return;
    }
    const isWhiteLastMove = this.loadedStateMoveColor === 'white';
    this.shouldPlay = event.isLightSide ? !isWhiteLastMove : isWhiteLastMove
  }

  onReset(event: OfflineManagerEvent) {
    if (!this.board) return;
    this.shouldPlay = event.isLightSide;
    this.board.reset();
  }

  onMoveChange(event: BoardEvent) {
    const isOpponentMove = [event.color === 'white' && !this.isLightSide, event.color === 'black' && this.isLightSide].includes(true);
    if (isOpponentMove) return;
    this.shouldPlay = false;
    window.parent.postMessage(event, '*');
  }

}
