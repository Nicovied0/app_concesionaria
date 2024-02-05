import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DealershipService } from 'src/app/core/services/Dealership.service';
import { VehiclesService } from 'src/app/core/services/Vehicle.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss'],
})
export class ContactformComponent implements OnInit {
  id: any;
  vehicle: any;
  dealership: any;
  form: any = {
    name: '',
    email: '',
    subject: '',
    message: '',
    idVehicle: '',
  };
  formValidates = false;

  constructor(
    private dealershipService: DealershipService,
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getVehicle(this.id);
    });
  }

  onSubmit() {
    this.form.idVehicle = this.id;
    if (this.validateForm()) {

      console.log('Formulario válido', this.form);
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: '',
        idVehicle: '',
      };
    } else {
      console.log('El formulario no es válido');
    }
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      (res) => {
        this.vehicle = res;
        console.log(this.vehicle);
        this.getDealershipByName(this.vehicle.dealershipName);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  getDealershipByName(name: any) {
    this.dealershipService.getDealershipByname(name).subscribe(
      (res) => {
        this.dealership = res;
        console.log(this.dealership);
      },
      (error) => {
        console.error('Error fetching vehicle:', error);
      }
    );
  }

  validateForm(): boolean {
    const form = this.form;
    
    if (
      form.name === '' ||
      form.email === '' ||
      form.subject === '' ||
      form.message === '' 
    ) {
      return false;
    }
  
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(form.email)) {
      return false;
    }
  
    return true;
  }
  
}
