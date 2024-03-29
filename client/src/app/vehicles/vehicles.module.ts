import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { DetailviewComponent } from './view/detailview/detailview.component';
import { FiltersComponent } from './components/filters/filters.component';

import { TranslateModule } from '@ngx-translate/core';
import { LoadersComponent } from './components/loaders/loaders.component';
import { FiltesbyubicationComponent } from './components/filtesbyubication/filtesbyubication.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SharedModule } from '../shared/shared.module';
import { ContactviewComponent } from './view/contactview/contactview.component';
import { ContactformComponent } from './components/contactform/contactform.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VehicleComponent,
    VehicleDetailComponent,
    HomeviewComponent,
    DetailviewComponent,
    FiltersComponent,
    LoadersComponent,
    FiltesbyubicationComponent,
    SearchbarComponent,
    ContactviewComponent,
    ContactformComponent,
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule.forChild(),
  ],
})
export class VehiclesModule {}
