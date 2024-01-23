import { ProfileService } from '../services/Profile.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private apiUrl = environment.backUrl;

    constructor(private http: HttpClient, private profileService: ProfileService) {
        this.getIdLocal();
    }

    userID = '';

    getDealershipsByUserId(userId: string): Observable<any> {
        const url = `${this.apiUrl}/user/${userId}/dealership`;
        return this.http.get<any>(url);
    }

    getIdLocal() {
        this.userID = this.profileService.getUserDataFromLocalStorage()?.id || '';
    }
}
