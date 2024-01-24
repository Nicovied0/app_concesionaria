import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/core/services/Brand.service';
import { UbicationsService } from 'src/app/core/services/Ubications.service';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent implements OnInit {
  constructor(private brandService: BrandService, private ubicationsService: UbicationsService) {}

  newCar: any = { brand: '' };

  showAddCarForm = false;
  brandNames: any[] = [];
  states: any;
  citys: any[] = [];
  selectedStates: string = '';
  selectedMunicipalities: any;

  ngOnInit() {
    this.getBrands();
    this.getStates();
  }

  addCar() {
    console.log('Adding car:', this.newCar);
  }

  toggleAddCar() {
    this.showAddCarForm = !this.showAddCarForm;
  }

  isFormValid(): boolean {
    return this.newCar.brand.trim() !== '';
  }

  getBrands() {
    this.brandService.getDataBrands().subscribe(
      (data: any[]) => {
        this.brandNames = data.map((item) => item.brandName);
        console.log(this.brandNames);
      },
      (error) => {
        console.error('Error al obtener las imágenes:', error);
      }
    );
  }

  onStateChange() {
    if (this.selectedStates) {
      this.getMunicipalities(this.selectedStates);
    }
  }

  getStates() {
    this.ubicationsService.getStates().subscribe(
      (data: any) => {
        this.states = data.provincias;
        this.onStateChange();
      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }

  getMunicipalities(selectedStates: any) {
    this.ubicationsService.getMunicipalities(selectedStates).subscribe(
      (data: any) => {
        this.citys = data.municipios;
        console.log(this.citys)
      },
      (error) => {
        console.error('Error obteniendo municipios:', error);
      }
    );
  }
}
