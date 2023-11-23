import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicles } from './Vehicle.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleSharedService {
  private vehiclesSubject: BehaviorSubject<Vehicles[]> = new BehaviorSubject<Vehicles[]>([]);
  public vehicles$: Observable<Vehicles[]> = this.vehiclesSubject.asObservable();
  public loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  updateVehicles(vehicles: Vehicles[]): void {
    this.vehiclesSubject.next(vehicles);
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }
}
