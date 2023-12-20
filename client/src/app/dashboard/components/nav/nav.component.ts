import { ProfileService } from 'src/services/Profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private profileService : ProfileService,private router :Router){}
  data : any

  ngOnInit(){
    this.getProfile()
  }

  getProfile(){
   this.data =  this.profileService.getUserDataFromLocalStorage()
   console.log(this.data)
  }

  goHome(){
    this.router.navigate(['/'])
  }

  goProfile(){
    this.router.navigate(['/dashboard/profile'])
  }

}
