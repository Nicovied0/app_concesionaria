import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Vehicles } from './Vehicle.service';
@Injectable({
  providedIn: 'root'
})
export class VehicleSharedService {
  private vehiclesSource = new BehaviorSubject<Vehicles[]>([]);
  vehicles$ = this.vehiclesSource.asObservable();
  filteredVehiclesSource = new BehaviorSubject<Vehicles[]>([]);
  filteredVehicles$ = this.filteredVehiclesSource.asObservable();

  constructor() { }

  updateVehicles(vehicles: Vehicles[]) {
    this.vehiclesSource.next(vehicles);
  }

  updateFilteredVehicles(filteredVehicles: Vehicles[]) {
    this.filteredVehiclesSource.next(filteredVehicles);
  }
}
