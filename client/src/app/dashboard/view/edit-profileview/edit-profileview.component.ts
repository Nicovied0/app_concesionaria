import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-edit-profileview',
  templateUrl: './edit-profileview.component.html',
  styleUrls: ['./edit-profileview.component.scss'],
})
export class EditProfileviewComponent {
  isLargeScreen: boolean = true;
  ngOnInit() {
    this.isLargeScreen = this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isLargeScreen = this.checkScreenSize();
  }

  checkScreenSize(): boolean {
    return window.innerWidth >= 750;
  }
}
