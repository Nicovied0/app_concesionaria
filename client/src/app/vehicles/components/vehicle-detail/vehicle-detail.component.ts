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
}
