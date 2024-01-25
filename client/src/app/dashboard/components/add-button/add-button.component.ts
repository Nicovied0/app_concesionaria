import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddNewvehicleService } from 'src/app/core/services/AddNewVehicle.service';
import { BrandService } from 'src/app/core/services/Brand.service';
import { CloudinaryService } from 'src/app/core/services/Cloudinary.service';
import { DealershipService } from 'src/app/core/services/Dealership.service';
import { ProfileService } from 'src/app/core/services/Profile.service';
import { UbicationsService } from 'src/app/core/services/Ubications.service';
import { forkJoin } from 'rxjs';

import Swal from 'sweetalert2';

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
    private dealershipService: DealershipService,
    private cloudinaryService:CloudinaryService
  ) {}

  @Output() newCarEvent = new EventEmitter<string>();

  showAddCarForm = false;
  brandNames: any[] = [];
  states: any;
  citys: any[] = [];
  selectedStates: string = '';
  selectedMunicipalities: any;
  dealership: any;
  profile: any;
  selectedImages: File[] = [];
  selectedImagesUrls: string[] = [];


  newCar: any = { brand: '',images: [] };

  ngOnInit() {
    this.getBrands();
    this.getStates();
    this.getProfile();
  }
  sendNewCar() {
    const newCar = this.newCar;
    this.newCarEvent.emit(newCar);
  }

  addCar() {
    this.addNewvehicleService.addCar(this.newCar).subscribe(
      (response) => {
        console.log('vehiculo creado', response);
        this.showAddCarForm = false;
        this.sendNewCar();

        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Vehicle created successfully.',
        });
      },
      (error) => {
        console.error('Error crear vehiculo:', error);
      }
    );
    console.log(this.newCar);
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

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.selectedImages = Array.from(files);
      this.selectedImagesUrls = this.selectedImages.map((image) => URL.createObjectURL(image));
    }
  }


  uploadImages() {
    if (this.selectedImages.length === 0) {
      console.log(this.selectedImagesUrls)
      return;
    }

    const uploadObservables = this.selectedImages.map((image) =>
      this.cloudinaryService.uploadImage(image)
    );

    forkJoin(uploadObservables).subscribe(
      (responses: any[]) => {
        const uploadedUrls = responses.map((response) => response.url);
        this.newCar.images = [...this.newCar.images, ...uploadedUrls];
      
      },
      (error) => {
        console.error('Error uploading images:', error);
       
      }
    );
  }
  deleteImage(index: number) {
    this.newCar.images.splice(index, 1);
  }
}
