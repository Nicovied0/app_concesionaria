import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeviewComponent } from './view/homeview/homeview.component';

import { TranslateModule } from '@ngx-translate/core';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { DealershipsComponent } from './components/dealerships/dealerships.component';
import { BrandsComponent } from './components/brands/brands.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeviewComponent,
    PromotionsComponent,
    DealershipsComponent,
    BrandsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forChild(),
  ]
})
export class HomeModule { }
