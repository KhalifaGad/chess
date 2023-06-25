import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineBoardComponent, OfflineComponent } from "src/app/components/offline";
import { OnlineComponent } from "src/app/components/online/online.component";

const routes: Routes = [
  { path: 'offline', component: OfflineComponent, },
  { path: 'offline-board', component: OfflineBoardComponent },
  { path: 'online', component: OnlineComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
