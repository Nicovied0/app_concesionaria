import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/core/services/Cloudinary.service';
import { ProfileService } from 'src/app/core/services/Profile.service';

@Component({
  selector: 'app-edit-profileview',
  templateUrl: './edit-profileview.component.html',
  styleUrls: ['./edit-profileview.component.scss'],
})
export class EditProfileviewComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private cloudinaryService: CloudinaryService
  ) {}

  isLargeScreen: boolean = true;
  user: any;
  role: any;
  editedUser: any = {
    name: '',
    role: '',
    email: '',
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
    this.user = this.profileService.getUserDataFromLocalStorage();
    this.role = this.user.role;
    this.editedUser.role = this.role;
    this.editedUser.name = this.user.name;
    this.editedUser.email = this.user.email;
  }

  saveChanges() {
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
