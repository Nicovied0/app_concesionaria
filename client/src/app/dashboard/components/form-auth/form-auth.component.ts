import { Component } from '@angular/core';

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss']
})
export class FormAuthComponent {
  showLogin: boolean = true;
  loginData = {
    email: '',
    password: ''
  };
  registerData = {
    username: '',
    password: '',
    email:''
  };

  toggleForm(isLogin: boolean) {
    this.showLogin = isLogin;
  }

  login() {
    console.log('Datos de inicio de sesión:', this.loginData);
  }

  registerUser() {
    console.log('Datos de registro:', this.registerData);
    // Aquí iría la lógica para registrar al usuario
  }
}
