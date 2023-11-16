import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeviewComponent } from './view/homeview/homeview.component';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HomeviewComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    TranslateModule.forChild(),
  ]
})
export class HomeModule { }
