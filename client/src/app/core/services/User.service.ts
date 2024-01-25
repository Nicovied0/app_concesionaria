import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.backUrl + '/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(catchError(() => of([])));
  }

  getUserById(id: any): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiUrl + '/' + id)
      .pipe(catchError(() => of([])));
  }
}

export interface User {
  _id: string;
  name: string;
  imagen: string;
  email: string;
  role: string;
  actived: boolean;
  description: any;
  dealership: string;
}
