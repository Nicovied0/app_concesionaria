import { Router } from '@angular/router';
import { BrandService } from '../../../core/services/Brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  images: any[] = [];

  constructor(private brandService: BrandService,private router : Router) { }

  ngOnInit() {
    this.getBrandImages();
  }

  getBrandImages() {
    this.brandService.getDataBrands().subscribe(
      (data: any[]) => {
        this.images = data;
      },
      (error) => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }

  goBrand(name:any){
    this.router.navigate([`/vehicles/${name}`])
    window.scroll(0,0)
  }

}
