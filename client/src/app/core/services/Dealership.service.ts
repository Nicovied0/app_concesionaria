import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DealershipService {
  private apiUrl = environment.backUrl + '/dealership';
  private apiUrl2 = environment.backUrl;

  constructor(private http: HttpClient) {}

  getDealershipByUserId(id: any): Observable<Dealership[]> {
    return this.http
      .get<Dealership[]>(this.apiUrl + '/' + id + '/dealership')
      .pipe(catchError(() => of([])));
  }

  getVehiclesInDealership(id: any): Observable<any[]> {
    return this.getDealershipByUserId(id).pipe(
      switchMap((dealership: Dealership[]) => {
        const carIds = dealership[0].cars;

        const vehicleRequests = carIds.map((carId: any) =>
          this.getVehicleDetail(carId)
        );

        return forkJoin(vehicleRequests) as Observable<any[]>;
      }),
      catchError(() => of([]))
    );
  }

  getVehicleDetail(id: any): Observable<any> {
    return this.http
      .get<any>(this.apiUrl2 + '/cars/' + id)
      .pipe(catchError(() => of(null)));
  }
}

export interface Dealership {
  _id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: boolean;
  cars: any;
  admins: any;
}
