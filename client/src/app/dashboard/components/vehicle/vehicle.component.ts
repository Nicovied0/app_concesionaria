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
    // Save changes and update the server or local storage
    console.log('Updated Values:', vehicle);
    vehicle.isEditing = false;
  }

  cancelEditing(vehicle: any) {
    // Reset changes or revert to the original state
    vehicle.isEditing = false;
  }

  deleteVehicle(index: number) {
    // Implement delete logic and update the server or local storage
    this.vehicles.splice(index, 1);
  }
}
