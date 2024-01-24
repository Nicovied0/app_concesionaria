import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface BrandImage {
  id: number;
  brandName: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private imagesUrl = '../assets/mocks/brands.mock.json';

  constructor(private http: HttpClient) { }

  getDataBrands(): Observable<BrandImage[]> {
    return this.http.get<BrandImage[]>(this.imagesUrl);
  }

}
