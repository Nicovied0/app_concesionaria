import { Component } from '@angular/core';
import { VehiclesService, Vehicles } from '../../../../services/Vehicle.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  constructor(private vehiclesService: VehiclesService) {}

  vehicles: Vehicles[] = [];

  getVehiclesByPrice() {
    this.vehiclesService.getVehiclesSortedByPrice().subscribe(
      (vehicles) => {
        this.vehicles = vehicles;
        // Maneja la lógica para mostrar o utilizar los vehículos ordenados por precio
        console.log('Vehículos ordenados por precio:', vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos ordenados por precio:', error);
      }
    );
  }
}
