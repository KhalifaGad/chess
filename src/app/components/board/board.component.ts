import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MoveChange, NgxChessBoardView } from "ngx-chess-board";
import { BoardEvent } from "src/app/types";

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() shouldPlay = false;
  @Input() isLightSide: boolean | null = null;
  @Output() onMoveEvent: EventEmitter<BoardEvent> = new EventEmitter<BoardEvent>();

  @ViewChild('board', { static: false }) board!: NgxChessBoardView;

  onMoveChange(event: MoveChange) {
    this.onMoveEvent.emit(event as any as BoardEvent);
  }

  simulateMove(move?: string) {
    if (!move) return;
    this.board.move(move);
  }

  reset() {
    this.board.reset();
  }

  getFEN() {
    return this.board.getFEN();
  }

  setFEN(fen?: string | null) {
    if (!fen) return;
    this.board.setFEN(fen);
  }
}
