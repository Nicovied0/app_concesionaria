import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthviewComponent } from './view/authview/authview.component';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { ProfileviewComponent } from './view/profileview/profileview.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormAuthComponent } from './components/form-auth/form-auth.component';


@NgModule({
  declarations: [
    AuthviewComponent,
    HomeviewComponent,
    ProfileviewComponent,
    LoginFormComponent,
    RegisterFormComponent,
    FormAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule ,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
