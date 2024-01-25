import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/core/services/Cloudinary.service';
import { ProfileService } from 'src/app/core/services/Profile.service';
import { UserService } from 'src/app/core/services/User.service';

@Component({
  selector: 'app-edit-profileview',
  templateUrl: './edit-profileview.component.html',
  styleUrls: ['./edit-profileview.component.scss'],
})
export class EditProfileviewComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private userService: UserService
  ) {}

  isLargeScreen: boolean = true;
  user: any;
  role: any;
  idUser: any;
  editedUser: any = {
    name: '',
    role: '',
    email: '',
    image: '',
  };
  showEdit: boolean = false;

  ngOnInit() {
    this.getProfile();
    this.isLargeScreen = this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    return window.innerWidth >= 750;
  }

  getProfile() {
    this.idUser = this.profileService.getUserDataFromLocalStorage();
    this.getProfileByBd();
  }

  getProfileByBd() {
    this.userService.getUserById(this.idUser.id).subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);
        this.editedUser.role = this.user.role;
        this.editedUser.name = this.user.name;
        this.editedUser.email = this.user.email;
        this.editedUser.description = this.user.description;
        this.editedUser.phone = this.user.phone;
      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }

  saveChanges() {
    if (this.editedUser.image === '') {
      this.editedUser.image = this.user.imagen;
    }
    this.showEdit = false;
    console.log(this.editedUser, 'edited');
  }
  showEditForm() {
    this.showEdit = !this.showEdit;
  }

  onProfileImageSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.editedUser.image = URL.createObjectURL(file);
      this.uploadProfileImage(file);
    }
  }

  uploadProfileImage(image: File) {
    this.cloudinaryService.uploadImage(image).subscribe(
      (response: any) => {
        this.editedUser.image = response.url;
        console.log('Imagen de perfil cargada:', response.url);
      },
      (error) => {
        console.error('Error al cargar la imagen de perfil:', error);
      }
    );
  }

  deleteImage() {
    this.editedUser.image = '';
  }
}
