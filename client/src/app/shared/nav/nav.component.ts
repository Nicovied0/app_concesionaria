import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private router: Router, private languageService: LanguageService) { }

  active = false;
  enOn = false;
  esOn = true;

  goComunity() {
    this.router.navigate(['/community'])
    this.noShowBurger()
  }

  goHome() {
    this.router.navigate(['/dashboard'])
    this.noShowBurger()
  }

  goBussines() {
    this.router.navigate(['forBusiness'])
    this.noShowBurger()
  }
  goAboutUs() {
    this.router.navigate(['aboutUs'])
    this.noShowBurger()
  }
  goContact() {
    this.router.navigate(['contact'])
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