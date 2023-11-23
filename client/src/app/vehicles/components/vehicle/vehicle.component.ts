import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehiclesService, Vehicles } from './../../../../services/Vehicle.service';
import { VehicleSharedService } from 'src/services/VehicleSharedService';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  constructor(
    private vehiclesService: VehiclesService,
    private router: Router,
    private vehicleSharedService: VehicleSharedService
  ) {}

  vehicles: Vehicles[] = [];
  show: any = null;
  loading = false;

  ngOnInit() {
    this.getVehicles();
    this.subscribeToVehicleUpdates();
    this.subscribeToLoadingState();
  }

  private getVehicles() {
    this.vehicleSharedService.setLoading(true);

    this.vehiclesService.getVehicles().subscribe(
      res => {
        this.vehicles = res;
        this.show = true;
        this.vehicleSharedService.updateVehicles(this.vehicles);
        this.vehicleSharedService.setLoading(false);
      },
      error => {
        console.error('Error fetching vehicles:', error);
        this.vehicleSharedService.setLoading(false);
      }
    );
  }

  private subscribeToVehicleUpdates() {
    this.vehicleSharedService.vehicles$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((vehicles) => {
        this.vehicles = vehicles;
      });
  }

  private subscribeToLoadingState() {
    this.vehicleSharedService.loading$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  goDetail(id: any) {
    this.router.navigate(['/vehicles/', id]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
