import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-vehicles-view',
  templateUrl: './vehicles-view.component.html',
  styleUrls: ['./vehicles-view.component.scss'],
})
export class VehiclesViewComponent {
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
