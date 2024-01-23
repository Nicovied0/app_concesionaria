import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService, Vehicles } from '../../../core/services/Vehicle.service';
import { VehicleSharedService } from '../../../core/services/VehicleSharedService';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  filteredVehicles: Vehicles[] = [];
  originalVehicles: Vehicles[] = [];

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private vehicleSharedService: VehicleSharedService
  ) { }

  vehicles: Vehicles[] = [];
  loading = false;

  ngOnInit() {
    this.getVehicles();
    this.subscribeToFilteredVehicles();
  }

  private getVehicles() {
    this.loading = true;

    this.vehiclesService.getVehicles().subscribe(
      res => {
        this.originalVehicles = res.slice();
        this.applyFilter(this.originalVehicles);
        this.loading = false;
      },
      error => {
        console.error('Error fetching vehicles:', error);
        this.loading = false;
      }
    );
  }

  private subscribeToFilteredVehicles() {
    this.vehicleSharedService.filteredVehicles$.subscribe((filteredVehicles) => {
      this.applyFilter(filteredVehicles);
    });
  }

  private applyFilter(filteredVehicles: Vehicles[]) {
    this.filteredVehicles = filteredVehicles.length ? filteredVehicles : this.originalVehicles;
  }

  goDetail(id: any) {
    this.router.navigate(['/vehicles/detail/', id]);
    window.scroll(0, 0)
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
