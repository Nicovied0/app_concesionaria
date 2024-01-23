import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LanguageService } from '../core/services/Language.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    NavComponent,
     FooterComponent, 
     LoaderComponent],

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

  providers: [LanguageService],
})
export class SharedModule {}
