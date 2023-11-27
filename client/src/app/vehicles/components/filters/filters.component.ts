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
  selectedProvincia: string = '';
  selectedMunicipio: string = '';
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
  
  resetFilters() {
    this.filteredVehicles = [...this.originalVehicles]; // Restablecer los filtros a la lista original
    console.log('Filtros restablecidos a su estado original:', this.filteredVehicles);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
  }
  
  onSortOptionChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
  
    if (target instanceof HTMLSelectElement) {
      const option = target.value; // Accediendo al valor del select
  
      if (option === 'asc') {
        this.orderAsc();
      } else if (option === 'desc') {
        this.orderDesc();
      } else if (option === 'visits') {
        this.orderVisits();
      }
    }
  }

  onConditionFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
  
    if (target && target.value) {
      const condition = target.value;
      this.applyFilterByCondition(condition);
    }
  }
  
  onBrandFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
  
    if (target && target.value) {
      const brand = target.value;
      this.applyFilterByBrand(brand);
    }
  }

  applyFilterByLocation() {
    if (this.selectedProvincia && this.selectedMunicipio) {
      this.filteredVehicles = this.originalVehicles.filter(vehicle =>
        vehicle.state === this.selectedProvincia && vehicle.city === this.selectedMunicipio
      );
      console.log('Vehículos filtrados por ubicación:', this.filteredVehicles);
      this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
    } else {
      // Si alguno de los filtros no está seleccionado, mostrar todos los vehículos
      this.filteredVehicles = [...this.originalVehicles];
      console.log('Filtros de ubicación no seleccionados, mostrando todos los vehículos:', this.filteredVehicles);
      this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
    }
  }
  
  onProvinciaSeleccionada(provincia: string) {
    this.selectedProvincia = provincia;
    // Realizar acciones adicionales si es necesario al seleccionar una provincia
  }
  
  onMunicipioSeleccionado(municipio: string) {
    this.selectedMunicipio = municipio;
    // Realizar acciones adicionales si es necesario al seleccionar un municipio
  }
}
