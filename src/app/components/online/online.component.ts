import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from "src/app/components/board/board.component";
import { OnlineStateService } from "src/app/services";
import { BoardEvent } from "src/app/types";

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.scss']
})
export class OnlineComponent implements OnInit, OnDestroy {
  error: string | null = null;
  shouldPlay = false;
  isLightSide: boolean | null = null;
  @ViewChild('board', { static: false }) board?: BoardComponent;
  private isConnected = false;

  constructor(private onlineStateManager: OnlineStateService) {
  }

  ngOnInit(): void {
    this.onlineStateManager.connect().then(() => {
      // this.toState(fetchedState);
      this.isConnected = true;
    }).catch(() => {
      this.isConnected = false;
      this.error = "Failed to connect";
    });
  }

  ngOnDestroy(): void {
    this.onlineStateManager.disconnect();
  }

  toState(state?: string) {
    if (!state) return;
    this.board?.setFEN(state);
  }

  onMoveChange(event: BoardEvent) {
    const isOpponentMove = [event.color === 'white' && this.isLightSide === false, event.color === 'black' && this.isLightSide === true].includes(true);
    if (isOpponentMove) return;
    this.shouldPlay = false;
  }

  onOpponentMove(event: BoardEvent) {

  }
}
