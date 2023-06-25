import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from "@angular/fire/compat/database/interfaces";
import firebase from "firebase/compat";
import { BoardEvent } from "src/app/types";
import { v4 as uuid } from 'uuid'
import ThenableReference = firebase.database.Reference;

type BoardColor = "white" | "black";

type User = {
  id: string;
}

type Player = {
  userId: string;
  color: BoardColor;
}

type GameEvent = {
  boardEvent?: BoardEvent;
  event: "move" | "reset";
  createdAt: number;
}


@Injectable({
  providedIn: 'root'
})
export class OnlineStateService {
  private userRef: ThenableReference | null = null;
  private user: User = { id: uuid() };
  private playerRef: ThenableReference | null = null;
  private usersListRef!: AngularFireList<User>;
  private playersListRef!: AngularFireList<Player>;
  private eventsListRef!: AngularFireList<string>;

  constructor(private db: AngularFireDatabase) {
    this.usersListRef = this.db.list('users');
    this.playersListRef = this.db.list('players');
    this.eventsListRef = this.db.list('events');
  }

  async connect() {
    this.userRef = await this.usersListRef.push(this.user)
    await this.addPlayIfAllowed();
    
  }

  disconnect() {
    if (!this.userRef) return;
    this.usersListRef.remove(this.userRef).catch((error) => {
      console.log("Error removing user: ", error);
    });

    if (!this.playerRef) return;
    this.playersListRef.remove(this.playerRef).catch((error) => {
      console.log("Error removing player: ", error);
    });
  }

  async getLastMoves() {
    // const state = await this.eventsListRef.query
    // return state.val() as string;
  }


  onBoardNewMove(boardMove: BoardEvent) {

  }

  private async addPlayIfAllowed() {
    const players = await this.playersListRef.query.once('value');
    if (players.numChildren() >= 2) return;
    this.playerRef = await this.playersListRef.push({
      userId: this.user.id,
      color: players.numChildren() === 0 ? "white" : "black"
    });
  }
}
