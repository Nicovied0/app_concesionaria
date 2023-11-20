import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
    providedIn: 'root'
  })
  export class VehiclesService {
    private linkUrl =   environment.backUrl +"/cars";
  
    constructor(private http: HttpClient) { }
  
    getVehicles(): Observable<Vehicles[]> {
      return this.http.get<Vehicles[]>(this.linkUrl).pipe(
        catchError(() => of([]))
      );
    }
  
  }
  
  export interface Vehicles {
    active: boolean;
    brand: string;
    model: string;
    year: number;
    color: string;
    price: number;
    dealershipName:string,
    country:string,
    state:string,
    city:string,
    kilometres:number
  }