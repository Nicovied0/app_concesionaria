import { Component } from '@angular/core';
import { ProfileService } from '../../../../services/Profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss']
})
export class ProfileviewComponent {
  constructor(private profileService : ProfileService,private router :Router,){}
  profile : any

  ngOnInit(){
    this.getProfile()
  }

  getProfile(){
   this.profile =  this.profileService.getUserDataFromLocalStorage()
   console.log(this.profile)
  }

  goProfileEdit() {
    this.router.navigate(['/dashboard/editProfile'])
  }
}
