import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  private linkUrl = environment.backUrl + '/search/byname';

  search(consulta: any) {
    const searchbyname = `${this.linkUrl}?consulta=${consulta}`;
    return this.http
      .get<Vehicles[]>(searchbyname)
      .pipe(catchError(() => of([])));
  }
}

export interface Vehicles {
  active: boolean;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  dealershipName: string;
  country: string;
  state: string;
  city: string;
  kilometres: number;
  _id: String;
  images: String;
  condition: String;
  counterVisits: any;
}
