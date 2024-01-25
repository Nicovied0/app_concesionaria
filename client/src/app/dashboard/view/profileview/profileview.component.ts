import { Component, HostListener } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
})
export class ProfileviewComponent {
  constructor(private profileService: ProfileService, private router: Router) {}
  profile: any;
  isLargeScreen: boolean = true;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage();
    console.log(this.profile);
  }

  goProfileEdit() {
    this.router.navigate(['/dashboard/editProfile']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    return window.innerWidth >= 750;
  }
}
