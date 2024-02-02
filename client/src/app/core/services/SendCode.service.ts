import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendCodeService {
  apiUrl = environment.backUrl;
  constructor(private http: HttpClient) {}

  sendCode(email: string) {
    const body = { email: email };
    console.log('emaiL', email);
    return this.http.post<any>(`${this.apiUrl}/email/code`, body);
  }


  addAdmin(dealershipId: string, userId: string) {
    console.log('dealershipId', dealershipId);
    console.log('userId', userId);
    return this.http.post<any>(`${this.apiUrl}/admins/${dealershipId}/addAdmin`, {
      userId,
    });
  }

  

}
