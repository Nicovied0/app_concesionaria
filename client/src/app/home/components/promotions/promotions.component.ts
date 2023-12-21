import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent {

  constructor(private router:Router){}

  goVehicle(){
    this.router.navigate(['/vehicles'])
    window.scroll(0,0)
  }
}
