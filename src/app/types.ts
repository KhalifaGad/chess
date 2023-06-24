export enum APP_TEMPLATE {
  WELCOME = 'WELCOME',
  WITH_NAV = 'WITH_NAV',
  SIMPLE = 'SIMPLE',
}

export interface BoardEvent {
  check: boolean;
  checkmate: boolean;
  color: "white" | "black";
  mate: false;
  move: string;
  stalemate: false;
}

export enum OfflineManagerEventName {
  MOVE = "MOVE",
  RESET = "RESET",
  ASSIGN = "ASSIGN",
}

export interface OfflineManagerEvent {
  isLightSide: boolean;
  opponentMove?: string;
  eventName: OfflineManagerEventName;
}


export interface GameState {
  fen: string;
  lastMoveColor: "white" | "black";
}
