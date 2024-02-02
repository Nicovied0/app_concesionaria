import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

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

  virificateCode(){
    
  }
}
