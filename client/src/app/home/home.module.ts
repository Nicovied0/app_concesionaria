import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeviewComponent } from './view/homeview/homeview.component';

import { TranslateModule } from '@ngx-translate/core';
import { PromotionsComponent } from './components/promotions/promotions.component';
import { DealershipsComponent } from './components/dealerships/dealerships.component';
import { AdddealershipsComponent } from './components/adddealerships/adddealerships.component';

@NgModule({
  declarations: [
    HomeviewComponent,
    PromotionsComponent,
    DealershipsComponent,
    AdddealershipsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class HomeModule { }
