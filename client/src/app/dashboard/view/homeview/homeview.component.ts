import { Component } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.scss']
})
export class HomeviewComponent {

  constructor(private profileService: ProfileService, private router: Router,) { }
  profile: any
  role :any

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage()
    this.role = this.profile.role
  }
}
