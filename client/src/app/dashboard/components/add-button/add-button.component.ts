import { Component, OnInit } from '@angular/core';
import { AddNewvehicleService } from 'src/app/core/services/AddNewVehicle.service';
import { BrandService } from 'src/app/core/services/Brand.service';
import { DealershipService } from 'src/app/core/services/Dealership.service';
import { ProfileService } from 'src/app/core/services/Profile.service';
import { UbicationsService } from 'src/app/core/services/Ubications.service';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent implements OnInit {
  constructor(
    private brandService: BrandService,
    private addNewvehicleService: AddNewvehicleService,
    private ubicationsService: UbicationsService,
    private profileService: ProfileService,
    private dealershipService: DealershipService
  ) {}

  showAddCarForm = false;
  brandNames: any[] = [];
  states: any;
  citys: any[] = [];
  selectedStates: string = '';
  selectedMunicipalities: any;
  dealership: any;
  profile: any;

  newCar: any = { brand: '' };

  ngOnInit() {
    this.getBrands();
    this.getStates();
    this.getProfile();
  }

  addCar() {
    console.log('Adding car:', this.newCar);

    this.addNewvehicleService.addCar(this.newCar).subscribe(
      (response) => {
        console.log('vehiculo creado', response);
        this.showAddCarForm = false;
      },
      (error) => {
        console.error('Error crear vehiculo:', error);
      }
    );
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
      this.newCar.state = this.selectedStates || '';
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
        console.log(this.citys);
      },
      (error) => {
        console.error('Error obteniendo municipios:', error);
      }
    );
  }

  getProfile() {
    this.profile = this.profileService.getUserDataFromLocalStorage();

    this.getVehicleById(this.profile.id);
  }

  getVehicleById(profileId: any) {
    this.dealershipService.getDealershipByUserId(profileId).subscribe(
      (res) => {
        this.dealership = res[0];
        this.newCar.dealershipName = this.dealership?.name || '';
        this.newCar.country = this.dealership?.country || '';
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }
}
