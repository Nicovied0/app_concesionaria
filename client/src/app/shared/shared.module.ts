import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    LoaderComponent

],
  imports: [
    CommonModule,
    TranslateModule.forChild()
  ],
  exports: [
    HttpClientModule,
    NavComponent,
    FooterComponent,
    LoaderComponent

  ],
  providers: [
    
  ]
})
export class SharedModule { }
