import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = environment.backUrl;
  constructor(private http: HttpClient) {}

  sendMessage(body: any) {
    return this.http.post<any>(`${this.apiUrl}/email/contact`, body);
  }
}
