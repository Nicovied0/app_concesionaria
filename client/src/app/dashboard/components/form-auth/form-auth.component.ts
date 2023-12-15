import { AuthService } from './../../../../services/Auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss']
})
export class FormAuthComponent {

  constructor(private authService: AuthService) { }

  showLogin: boolean = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    username: '',
    password: '',
    email: ''
  };

  toggleForm(isLogin: boolean) {
    this.showLogin = isLogin;
  }

  login() {
    const { email, password } = this.loginData;
    this.authService.login(email, password)
      .subscribe(response => {
        console.log('Usuario registrado:', response);
      }, error => {
        console.error('Error al registrar usuario:', error);
      });

  }

  registerUser() {
    const { username, email, password } = this.registerData;
    this.authService.register(email, password, username)
      .subscribe(response => {
        console.log('Usuario registrado:', response);
      }, error => {
        console.error('Error al registrar usuario:', error);
      });
  }
}
