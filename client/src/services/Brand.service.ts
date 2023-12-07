import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define una interfaz para representar la estructura de los datos de las imágenes
interface BrandImage {
  id: number;
  brandName: string;
  imageUrl: string;
  // ... otras propiedades si las hay
}

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private imagesUrl = '../assets/mocks/brands.mock.json';

  constructor(private http: HttpClient) { }

  getImages(): Observable<BrandImage[]> {
    return this.http.get<BrandImage[]>(this.imagesUrl);
  }
}
