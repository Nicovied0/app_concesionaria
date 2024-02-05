import { VehiclesService } from '../../../core/services/Vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealershipService } from 'src/app/core/services/Dealership.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss'],
})
export class VehicleDetailComponent implements OnInit {
  vehicle: any;
  currentImageIndex: number = 0;
  dealership: any;
  id: any;

  constructor(
    private vehiclesService: VehiclesService,
    private dealershipService: DealershipService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getVehicle(this.id);
    });
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      (res) => {
        this.vehicle = res;
        console.log(this.vehicle);
        this.getDealershipByName(this.vehicle.dealershipName);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  getDealershipByName(name: any) {
    this.dealershipService.getDealershipByname(name).subscribe(
      (res) => {
        this.dealership = res;
        console.log(this.dealership);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  goContact() {
    this.router.navigate([
      `vehicles/detail/` + this.id + '/' + this.dealership.emailDealership,
    ]);
  }

  get currentImage(): string {
    if (this.vehicle && this.vehicle.images && this.vehicle.images.length > 0) {
      return this.vehicle.images[this.currentImageIndex];
    }
    return '';
  }

  showPreviousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.vehicle.images.length - 1;
    }
  }

  showNextImage(): void {
    if (this.currentImageIndex < this.vehicle.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
}
