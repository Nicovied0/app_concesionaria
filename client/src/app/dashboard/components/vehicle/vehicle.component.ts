import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent {
  @Input() vehicles: any[] = [];
  @Input() dealershipName : any

  

  startEditing(vehicle: any) {
    vehicle.isEditing = true;
  }

  saveEditing(vehicle: any) {
    console.log('Updated Values:', vehicle);
    vehicle.isEditing = false;
  }

  cancelEditing(vehicle: any) {
    vehicle.isEditing = false;
  }

  deleteVehicle(index: number) {
    this.vehicles.splice(index, 1);
  }
}
