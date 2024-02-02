import { Component, Input, OnChanges } from '@angular/core';
import { DealershipService } from 'src/app/core/services/Dealership.service';
import { ProfileService } from 'src/app/core/services/Profile.service';
import { SendCodeService } from 'src/app/core/services/SendCode.service';
import { UbicationsService } from 'src/app/core/services/Ubications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-dealership',
  templateUrl: './form-dealership.component.html',
  styleUrls: ['./form-dealership.component.scss'],
})
export class FormDealershipComponent implements OnChanges {
  @Input() consultationType: string | undefined;
  @Input() profile: any;
  verification: Boolean = false;
  typeForm: boolean | undefined = undefined;
  correctVerification: boolean = false;
  form1: any = {
    userCreatorId: '',
    country: 'Argentina',
    admins: [],
    dealershipName: '',
    email: '',
    phoneNumber: '',
    state: '',
    city: '',
  };

  form2: any = { verificationCode: '' };
  selectedStates: string = '';
  dataToVerificate: any;
  states: any;
  citys: any[] = [];

  constructor(
    private ubicationsService: UbicationsService,
    private sendCodeService: SendCodeService,
    private dealershipService: DealershipService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.getStates();
  }

  ngOnChanges() {
    if (this.consultationType === 'new') {
      this.typeForm = true;
    }
    if (this.consultationType === 'existing') {
      this.typeForm = false;
    }
  }

  sendVerification() {
    console.log(this.dataToVerificate, 'verificados');
    console.log(this.verification, 'verificado');
    this.sendCodeService.sendCode(this.dataToVerificate).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
        this.verification = true;
        Swal.fire({
          icon: 'success',
          title: 'Mail sent successfully',
        });
      },
      (error) => {
        console.error('Error sending email:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error sending email',
          text: 'try to enter a correct email',
        });
      }
    );
  }

  submitForm1() {
    this.form1.userCreatorId = this.profile.id;
    this.form1.admins[0] = this.profile.id;
    if (this.validateForm1()) {
      console.log('Formulario válido:', this.form1);
    } else {
      console.log('Formulario inválido');
    }
  }

  submitForm2() {
    if (this.validateForm2()) {
      console.log('Formulario válido:', this.form2.verificationCode);
      const emailToVerify = this.dataToVerificate;
      const verificationCode = this.form2.verificationCode;

      console.log('emailToVerify', emailToVerify);
      console.log('verificationCode', verificationCode);

      this.dealershipService.getDealershipByEmail(emailToVerify).subscribe(
        (response) => {
          if (response && response.codeLogin === verificationCode) {
            this.sendCodeService
              .addAdmin(response._id, this.profile.id)
              .subscribe(
                (adminResponse) => {
                  console.log(
                    'Usuario agregado como administrador:',
                    adminResponse
                  );
                  Swal.fire(
                    'Success',
                    'Usuario agregado como administrador',
                    'success'
                  );
                  this.verification = false;
                  this.correctVerification = true;
                  this.profileService.updateRol();
                },
                (adminError) => {
                  console.error(
                    'Error al agregar usuario como administrador:',
                    adminError
                  );
                  Swal.fire(
                    'Error',
                    'Hubo un error al agregar usuario como administrador',
                    'error'
                  );
                }
              );
          } else {
            Swal.fire('Error', 'El código ingresado es incorrecto', 'error');
          }
        },
        (error) => {
          console.error('Error fetching dealership by email:', error);
          Swal.fire(
            'Error',
            'Hubo un error al obtener la concesionaria por correo electrónico',
            'error'
          );
        }
      );
    } else {
      console.log('Formulario inválido');
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

  onStateChange() {
    if (this.selectedStates) {
      this.form1.state = this.selectedStates || '';
      this.getMunicipalities(this.selectedStates);
    }
  }

  validateForm1(): boolean {
    return (
      this.form1.dealershipName !== '' &&
      this.form1.email !== '' &&
      this.form1.phoneNumber !== '' &&
      this.form1.state !== '' &&
      this.form1.city !== ''
    );
  }
  validateForm2(): boolean {
    return this.form2.verificationCode !== '';
  }
}
