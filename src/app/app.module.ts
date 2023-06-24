import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChessBoardModule } from "ngx-chess-board";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { OfflineBoardComponent } from './offline-board/offline-board.component';
import { OfflineComponent } from './offline/offline.component';
import { OnlineComponent } from './online/online.component';

@NgModule({
  declarations: [
    AppComponent,
    OfflineComponent,
    OnlineComponent,
    BoardComponent,
    OfflineBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChessBoardModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
