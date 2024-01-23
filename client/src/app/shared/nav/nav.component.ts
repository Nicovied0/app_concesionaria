import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LanguageService } from 'src/services/Language.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router, private languageService: LanguageService) {
  }

  incluyeVehicleDetail: boolean = false

  active = false;
  enOn = false;
  esOn = true;

  ngOnInit() {
    this.getRoute()
  }

  getRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.incluyeVehicleDetail = this.router.url.includes('vehicles/detail');
      }
    });
  }

  goHome() {
    this.router.navigate([''])
    this.noShowBurger()
  }

  goVehicles() {
    this.router.navigate(['/vehicles'])
    this.noShowBurger()
  }

  goContact() {
    this.router.navigate(['/contact'])
    this.noShowBurger()
  }

  goDashboard() {
    this.router.navigate(['/dashboard'])
    this.noShowBurger()
  }


  showBurger() {
    this.active = !this.active;
  }

  noShowBurger() {
    this.active = false;
  }

  changeLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    if (lang === "es") {
      this.esOn = true;
      this.enOn = false;
    } else {
      this.esOn = false;
      this.enOn = true;
    }
  }

}