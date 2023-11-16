import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private router: Router, private languageService: LanguageService) { }

  active = false;
  enOn = false;
  esOn = true;


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