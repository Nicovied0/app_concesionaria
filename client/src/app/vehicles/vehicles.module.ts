import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { DetailviewComponent } from './view/detailview/detailview.component';
import { FiltersComponent } from './components/filters/filters.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    VehicleComponent,
    VehicleDetailComponent,
    HomeviewComponent,
    DetailviewComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class VehiclesModule { }
