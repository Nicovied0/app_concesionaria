import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private linkUrl = environment.backUrl + "/login";
  private registerUrl = environment.backUrl + "/register/newUser";

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post(this.linkUrl, credentials);
  }

  register(email: string, password: string, name: string): Observable<any> {
    const credentials = { email, password, name };
    console.log(credentials, "credenciales")
    console.log(this.registerUrl, "this.registerUrl")
    return this.http.post(this.registerUrl, credentials);
  }


  storeUserData(token: string, userData: any) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserData(): any | null {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  }

  isLoged(): boolean {
    const authToken = this.getToken();
    return authToken !== null;
  }

}