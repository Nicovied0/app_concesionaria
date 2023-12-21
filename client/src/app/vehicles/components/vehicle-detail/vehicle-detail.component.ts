import { VehiclesService } from './../../../../services/Vehicle.service';
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
    // Obtiene el parámetro de la ruta actual llamado 'id'
    this.route.params.subscribe(params => {
      const id = params['id']; // 'id' es el nombre del parámetro en la ruta
      this.getVehicle(id);
      
    });
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      res => {
        this.vehicle = res;
         console.log(this.vehicle)
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
