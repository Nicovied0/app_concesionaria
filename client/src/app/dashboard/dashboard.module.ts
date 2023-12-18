import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { TranslateModule } from '@ngx-translate/core';

import { AuthviewComponent } from './view/authview/authview.component';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { ProfileviewComponent } from './view/profileview/profileview.component';
import { FormAuthComponent } from './components/form-auth/form-auth.component';


@NgModule({
  declarations: [
    AuthviewComponent,
    HomeviewComponent,
    ProfileviewComponent,
    FormAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    HttpClientModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class DashboardModule { }
