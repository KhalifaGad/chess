import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfflineComponent } from './offline/offline.component';
import { OnlineComponent } from './online/online.component';

@NgModule({
  declarations: [
    AppComponent,
    OfflineComponent,
    OnlineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
