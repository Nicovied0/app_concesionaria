import { BrandService } from './../../../../services/Brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  images: any[] = [];

  constructor(private brandService: BrandService) { }

  ngOnInit() {
    this.getBrandImages();
  }

  getBrandImages() {
    this.brandService.getImages().subscribe(
      (data: any[]) => {
        this.images = data;
        console.log(this.images);
      },
      (error) => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }

}
