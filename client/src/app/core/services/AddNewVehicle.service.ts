import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddNewvehicleService {
  private apiUrl = environment.backUrl + '/cars';
  
  constructor(private http: HttpClient) {}

  addCar(newCar: any): Observable<any> {
    return this.http.post(this.apiUrl, newCar).pipe(
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError(error);
      }),
      switchMap((response: any) => {
        return of(response);
      })
    );
  }
}
