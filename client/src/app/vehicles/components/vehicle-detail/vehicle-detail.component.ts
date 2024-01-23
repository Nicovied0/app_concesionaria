import { VehiclesService } from '../../../core/services/Vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  vehicle: any;
  currentImageIndex: number = 0;
  
  constructor(
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.getVehicle(id);
      
    });
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      res => {
        this.vehicle = res;
      },
      error => {
        console.error('Error fetching vehicle:', error);
      }
    );
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
