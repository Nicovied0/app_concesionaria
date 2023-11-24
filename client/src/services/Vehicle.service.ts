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
    private linkUrlFilters = environment.backUrl + "/filter"
  
    constructor(private http: HttpClient) { }
  
    getVehicles(): Observable<Vehicles[]> {
      return this.http.get<Vehicles[]>(this.linkUrl).pipe(
        catchError(() => of([]))
      );
    }
    

    getVehicleDetail(id:any): Observable<Vehicles[]> {
      return this.http.get<Vehicles[]>(this.linkUrl + "/" + id).pipe(
        catchError(() => of([]))
      );
    }

    getVehiclesSortedByAsc(): Observable<Vehicles[]> {
      const sortByPriceUrl = `${this.linkUrlFilters}?sort=may`;
      return this.http.get<Vehicles[]>(sortByPriceUrl).pipe(
        catchError(() => of([]))
      );
    }

    
    getVehiclesSortedByDes(): Observable<Vehicles[]> {
      const sortByPriceUrl = `${this.linkUrlFilters}?sort=men`;
      return this.http.get<Vehicles[]>(sortByPriceUrl).pipe(
        catchError(() => of([]))
      );
    }

    getVehiclesSortedByVisits(): Observable<Vehicles[]> {
      const sortByPriceUrl = `${this.linkUrlFilters}?sort=visits`;
      return this.http.get<Vehicles[]>(sortByPriceUrl).pipe(
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
    kilometres:number,
    _id:String,
    images:String,
    condition:String
    counterVisits:any
  }