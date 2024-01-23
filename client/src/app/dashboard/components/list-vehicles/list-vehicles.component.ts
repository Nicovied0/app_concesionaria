import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/Profile.service';
import { DealershipService } from '../../../core/services/Dealership.service';
import { VehiclesService } from '../../../core/services/Vehicle.service';


@Component({
  selector: 'app-list-vehicles',
  templateUrl: './list-vehicles.component.html',
  styleUrls: ['./list-vehicles.component.scss'],
})
export class ListVehiclesComponent implements OnInit {
  vehicles: any;
  profile: any;
  profileId: any;
  vehicle: any
  dealershipName: any

  constructor(
    private dealershipService: DealershipService,
    private profileService: ProfileService,
    private vehiclesService: VehiclesService
  ) {}

  ngOnInit() {
    this.getProfile();
    this.getVehicleById(this.profileId);
    this.getVehiclesInDealership(this.profileId)
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage();
    this.profileId = this.profile.id;
  }

  getVehicleById(profileId: any) {
    this.dealershipService.getDealershipByUserId(profileId).subscribe(
      (res) => {
        this.vehicles = res;
        this.dealershipName = this.vehicles[0].name
      },
      (error) => {
        // console.error('Error fetching vehicle:', error);
      }
    );
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      res => {
        this.vehicle = res;
      },
      error => {
        // console.error('Error fetching vehicle:', error);
      }
    );


  }

getVehiclesInDealership(profileId: any) {
  this.dealershipService.getVehiclesInDealership(profileId).subscribe(
    (res) => {
      this.vehicles = res.filter(vehicle => !!vehicle);
    },
    (error) => {
      // console.error('Error fetching vehicles in dealership:', error);
    }
  );
}



}
