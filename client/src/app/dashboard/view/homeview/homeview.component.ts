import { Component, HostListener } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { Router } from '@angular/router';
import { DealershipService } from 'src/app/core/services/Dealership.service';

@Component({
  selector: 'app-homeview',
  templateUrl: './homeview.component.html',
  styleUrls: ['./homeview.component.scss'],
})
export class HomeviewComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private dealershipService: DealershipService
  ) {}

  profile: any;
  role: any;
  isLargeScreen: boolean = true;
  dealership: any;
  activeForm:boolean = false;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
    this.getVehicleById(this.profile.id)
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

  getVehicleById(profileId: any) {
    this.dealershipService.getDealershipByUserId(profileId).subscribe(
      (res) => {
        this.dealership =res[0];
        console.log(this.dealership);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }
  toggleActiveForm(){
    this.activeForm = true;
  }
}
