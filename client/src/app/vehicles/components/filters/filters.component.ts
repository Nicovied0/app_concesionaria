import { Component } from '@angular/core';
import { VehiclesService, Vehicles } from '../../../core/services/Vehicle.service';
import { VehicleSharedService } from '../../../core/services/VehicleSharedService';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../../../core/services/Brand.service';

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
  brands: any[] = [];

  constructor(private brandService: BrandService,
    private vehiclesService: VehiclesService,
    private vehicleSharedService: VehicleSharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getVehicles();
    this.subscribeToVehicleUpdates();
    this.delayedFunction()
    this.getBrandImages();
  }

  private getVehicles() {
    this.vehiclesService.getVehicles().subscribe(
      (vehicles) => {
        this.updateVehicles(vehicles);
      },
      (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    );
  }

  private subscribeToVehicleUpdates() {
    this.vehicleSharedService.vehicles$.subscribe((vehicles) => {
      this.updateVehicles(vehicles);
    });
  }

  private updateVehicles(vehicles: Vehicles[]) {
    this.originalVehicles = vehicles;
    this.filteredVehicles = vehicles;
  }




  orderAsc() {
    this.filteredVehicles.sort((a, b) => a.price - b.price);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }


  orderDesc() {
    this.filteredVehicles.sort((a, b) => b.price - a.price);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }

  orderVisits() {
    this.filteredVehicles.sort((a, b) => b.counterVisits - a.counterVisits);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles)
  }

  applyFilterByCondition(condition: string) {
    this.filteredVehicles = this.originalVehicles.filter(vehicle => vehicle.condition === condition);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
  }

  async applyFilterByBrand(brand: string) {
    this.filteredVehicles = await this.originalVehicles.filter(vehicle => vehicle.brand === brand);
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
  }

  resetFilters() {
    this.filteredVehicles = [...this.originalVehicles];
    this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
    this.router.navigate(['vehicles'])
    window.scroll(0, 0)
  }

  onSortOptionChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;

    if (target instanceof HTMLSelectElement) {
      const option = target.value;

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
      this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
    } else {
      this.filteredVehicles = [...this.originalVehicles];
      this.vehicleSharedService.updateFilteredVehicles(this.filteredVehicles);
    }
  }

  onProvinciaSeleccionada(provincia: string) {
    this.selectedProvincia = provincia;
  }

  onMunicipioSeleccionado(municipio: string) {
    this.selectedMunicipio = municipio;
  }


  delayedFunction() {
    setTimeout(() => {
      this.route.paramMap.subscribe(params => {
        const currentBrand = params.get('brand');
        if (currentBrand) {
          this.applyFilterByBrand(currentBrand);
        }
      });
    }, 1000);
  }

  getBrandImages() {
    this.brandService.getDataBrands().subscribe(
      (data: any[]) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }
}
