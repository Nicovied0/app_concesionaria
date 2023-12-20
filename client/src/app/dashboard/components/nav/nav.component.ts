import { AuthService } from './../../../../services/Auth.service';
import { ProfileService } from 'src/services/Profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private profileService : ProfileService,private router :Router,private authService :AuthService ){}
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
  goDashboard(){
    this.router.navigate(['/dashboard'])
  }

  goProfile(){
    this.router.navigate(['/dashboard/profile'])
  }

  goProfileEdit(){
    this.router.navigate(['/dashboard/editProfile'])
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
