import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineComponent } from "src/app/offline/offline.component";
import { OnlineComponent } from "src/app/online/online.component";

const routes: Routes = [
  { path: 'offline', component: OfflineComponent },
  { path: 'online', component: OnlineComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
