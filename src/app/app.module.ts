import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { BrowserModule } from '@angular/platform-browser';
import { NgxChessBoardModule } from "ngx-chess-board";
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { OfflineBoardComponent, OfflineComponent } from './components/offline';
import { OnlineComponent } from './components/online/online.component';

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
    NgxChessBoardModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
