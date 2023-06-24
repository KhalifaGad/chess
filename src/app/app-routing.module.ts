import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineBoardComponent } from "src/app/offline-board/offline-board.component";
import { OfflineComponent } from "src/app/offline/offline.component";
import { OnlineComponent } from "src/app/online/online.component";

const routes: Routes = [
  { path: 'mainpage', component: OfflineComponent },
  { path: 'iframepage', component: OfflineBoardComponent },
  { path: 'online', component: OnlineComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
