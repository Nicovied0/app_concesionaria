import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/guards/auth.guard';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { AuthviewComponent } from './view/authview/authview.component';
import { ProfileviewComponent } from './view/profileview/profileview.component';
import { EditProfileviewComponent } from './view/edit-profileview/edit-profileview.component';
import { UsersviewComponent } from './view/usersview/usersview.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [AuthGuard],
    component: HomeviewComponent
  },
  {
    path: "auth",
    component: AuthviewComponent
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    component: ProfileviewComponent
  },{
    path: "editProfile",
    canActivate: [AuthGuard],
    component: EditProfileviewComponent
  },{
    path:"users",
    canActivate:[AuthGuard],
    component: UsersviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
