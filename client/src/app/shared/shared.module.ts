import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'src/services/Language.service';

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
    LanguageService
  ]
})
export class SharedModule { }
