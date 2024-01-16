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
import { NavComponent } from './components/nav/nav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileviewComponent } from './view/edit-profileview/edit-profileview.component';
import { UsersviewComponent } from './view/usersview/usersview.component';
import { VehiclesViewComponent } from './view/vehicles-view/vehicles-view.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';


@NgModule({
  declarations: [
    AuthviewComponent,
    HomeviewComponent,
    ProfileviewComponent,
    FormAuthComponent,
    NavComponent,
    ProfileComponent,
    EditProfileviewComponent,
    UsersviewComponent,
    VehiclesViewComponent,
    ListVehiclesComponent,
    VehicleComponent
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
