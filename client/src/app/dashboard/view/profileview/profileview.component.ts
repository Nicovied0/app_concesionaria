import { Component, HostListener } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-profileview',
  templateUrl: './profileview.component.html',
  styleUrls: ['./profileview.component.scss'],
})
export class ProfileviewComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  profile: any;
  user:any
  isLargeScreen: boolean = true;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage();
    console.log(this.profile);
    this.getProfileByBd();
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

  getProfileByBd() {
    this.userService.getUserById(this.profile.id).subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);

      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }
}
