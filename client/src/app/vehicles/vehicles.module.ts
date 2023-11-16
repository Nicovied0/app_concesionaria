import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { DetailviewComponent } from './view/detailview/detailview.component';


@NgModule({
  declarations: [
    VehicleComponent,
    VehicleDetailComponent,
    HomeviewComponent,
    DetailviewComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule
  ]
})
export class VehiclesModule { }
