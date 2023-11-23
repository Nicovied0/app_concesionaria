import { Component } from '@angular/core';
import { VehiclesService, Vehicles } from '../../../../services/Vehicle.service';
import { VehicleSharedService } from 'src/services/VehicleSharedService';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  constructor(private vehiclesService: VehiclesService,private vehicleSharedService: VehicleSharedService) {}

  vehicles: Vehicles[] = [];

  orderAsc() {
    this.vehiclesService.getVehiclesSortedByAsc().subscribe(
      (vehicles) => {
        this.vehicleSharedService.updateVehicles(vehicles);
        this.vehicles = vehicles;
        console.log('Vehículos ordenados por precio:', vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos ordenados por precio:', error);
      }
    );
  }

  orderDesc(){
    this.vehiclesService.getVehiclesSortedByDes().subscribe(
      (vehicles) => {
        this.vehicleSharedService.updateVehicles(vehicles);
        this.vehicles = vehicles;
        console.log('Vehículos ordenados por precio:', vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos ordenados por precio:', error);
      }
    );
  }

  orderVisits(){
    this.vehiclesService.getVehiclesSortedByVisits().subscribe(
      (vehicles) => {
        this.vehicleSharedService.updateVehicles(vehicles);
        this.vehicles = vehicles;
        console.log('Vehículos ordenados por precio:', vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos ordenados por precio:', error);
      }
    );
  }



}
