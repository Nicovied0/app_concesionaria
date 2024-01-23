
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: []
})
export class AppComponent {
  title = 'AutoMarket';

  showLoader: any = null
  ruta: any = true
  currentRoute = this.router.url;

  constructor(private translate: TranslateService, private router: Router) {
    translate.addLangs(['es', 'en'])
    translate.setDefaultLang('es');
    translate.use('es');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ruta = this.router.url

        if (this.ruta.includes('/dashboard')) {
          this.showLoader = false;
        } else {
          this.showLoader = true;
        }
      }
    });

  }
}
