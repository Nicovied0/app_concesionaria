import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DealershipService {
  private apiUrl = environment.backUrl + '/dealership';

  constructor(private http: HttpClient) {}

  getDealershipByUserId(id: any): Observable<Dealership[]> {
    return this.http
      .get<Dealership[]>(this.apiUrl + '/' + id)
      .pipe(catchError(() => of([])));
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
