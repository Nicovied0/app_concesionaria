import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ContactRoutingModule } from './contact-routing.module';
import { HomeviewComponent } from './view/homeview/homeview.component';

import { TranslateModule } from '@ngx-translate/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeviewComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ]
})
export class ContactModule { }
