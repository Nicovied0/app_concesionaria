import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/core/services/Contact.service';
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
    emailDealership: '',
    name: '',
    subject: '',
    message: '',
    idVehicle: '',
    email: '',
  };
  formValidates = false;

  constructor(
    private dealershipService: DealershipService,
    private vehiclesService: VehiclesService,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getVehicle(this.id);
    });
  }

  onSubmit() {
    this.form.idVehicle = this.id;
    this.form.emailDealership = this.dealership.emailDealership;
    if (this.validateForm()) {
      console.log('Formulario válido', this.form);
      this.contactService.sendMessage(this.form).subscribe(() => {
        this.form = {
          emailDealership: '',
          name: '',
          email: '',
          subject: '',
          message: '',
          idVehicle: '',
        };
      });
    } else {
      console.log('The form is not valid');
    }
  }

  getVehicle(id: any) {
    this.vehiclesService.getVehicleDetail(id).subscribe(
      (res) => {
        this.vehicle = res;
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
