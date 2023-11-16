import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { AuthviewComponent } from './view/authview/authview.component';
import { ProfileviewComponent } from './view/profileview/profileview.component';

const routes: Routes = [
  {
    path: "",
    component: HomeviewComponent
  },
  {
    path: "auth",
    component: AuthviewComponent
  },
  {
    path: "profile",
    component: ProfileviewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
