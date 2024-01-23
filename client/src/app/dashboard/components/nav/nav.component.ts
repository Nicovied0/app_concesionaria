import { AuthService } from '../../../core/services/Auth.service';
import { ProfileService } from '../../../core/services/Profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private profileService: ProfileService, private router: Router, private authService: AuthService) { }
  data: any
  role:any


  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.data = this.profileService.getUserDataFromLocalStorage()
    console.log(this.data)
    this.role = this.data.role
  }

  goHome() {
    this.router.navigate(['/'])
  }
  goDashboard() {
    this.router.navigate(['/dashboard'])
  }

  goProfile() {
    this.router.navigate(['/dashboard/profile'])
  }
  goUsers(){
    this.router.navigate(['/dashboard/users'])
  }

  goProfileEdit() {
    this.router.navigate(['/dashboard/editProfile'])
  }
  goVehicles(){
    this.router.navigate(['/dashboard/vehicles'])
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
