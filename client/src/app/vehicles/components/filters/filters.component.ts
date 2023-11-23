import { Component } from '@angular/core';
import { VehiclesService, Vehicles } from '../../../../services/Vehicle.service';
import { VehicleSharedService } from 'src/services/VehicleSharedService';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  originalVehicles: Vehicles[] = [];
  filteredVehicles: Vehicles[] = [];

  constructor(
    private vehiclesService: VehiclesService,
    private vehicleSharedService: VehicleSharedService
  ) { }

  ngOnInit() {
    this.getVehicles();
    this.subscribeToVehicleUpdates();
  }

  private getVehicles() {
    this.vehiclesService.getVehicles().subscribe(
      (vehicles) => {
        this.updateVehicles(vehicles);
        console.log('Vehículos obtenidos:', vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    );
  }

  private subscribeToVehicleUpdates() {
    this.vehicleSharedService.vehicles$.subscribe((vehicles) => {
      this.updateVehicles(vehicles);
      console.log('Vehículos actualizados en FiltersComponent:', vehicles);
    });
  }

  private updateVehicles(vehicles: Vehicles[]) {
    this.originalVehicles = vehicles;
    this.filteredVehicles = vehicles;
  }

  orderAsc() {
    this.filteredVehicles.sort((a, b) => a.price - b.price);
    console.log('Vehículos ordenados por precio ascendente:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }

  orderDesc() {
    this.filteredVehicles.sort((a, b) => b.price - a.price);
    console.log('Vehículos ordenados por precio descendente:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }

  orderVisits() {
    this.filteredVehicles.sort((a, b) => b.counterVisits - a.counterVisits);
    console.log('Vehículos ordenados por visitas:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }

  applyFilterByCondition(condition: string) {
    this.filteredVehicles = this.originalVehicles.filter(vehicle => vehicle.condition === condition);
    console.log('Vehículos filtrados por condición:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
  }
  
  applyFilterByBrand(brand: string) {
    this.filteredVehicles = this.originalVehicles.filter(vehicle => vehicle.brand === brand);
    console.log('Vehículos filtrados por marca:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
  }
  
}
