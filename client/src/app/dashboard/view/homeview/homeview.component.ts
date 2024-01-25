import { Component,HostListener  } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.scss'],
})
export class HomeviewComponent {

  constructor(private profileService: ProfileService, private router: Router) {}

  profile: any;
  role: any;
  isLargeScreen: boolean = true;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage();
    this.role = this.profile.role;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    return window.innerWidth >= 750;
  }
}
