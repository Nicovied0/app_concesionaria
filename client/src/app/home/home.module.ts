import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeviewComponent } from './view/homeview/homeview.component';
import { LandingviewComponent } from './view/landingview/landingview.component';


@NgModule({
  declarations: [
    HomeviewComponent,
    LandingviewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
