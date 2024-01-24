import { Component, Input } from '@angular/core';
import { UbicationsService } from '../../../core/services/Ubications.service';
import { VehiclesService } from '../../../core/services/Vehicle.service';
import Swal
 from 'sweetalert2';
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  @Input() vehicles: any[] = [];
  @Input() dealershipName: any;
  vehicle: any;
  states: any;
  citys: any;
  selectedStates: any;
  selectedMunicipalities: any;
  newCarData: any;

  constructor(
    private vehiclesService: VehiclesService,
    private ubicationsService: UbicationsService
  ) {}

  ngOnInit(): void {
    this.getStates();
  }

  newCar(newCar: any) {
    this.newCarData = { ...newCar };
    this.vehicles.push(this.newCarData);
    console.log('New Vehicle Data:', this.newCarData);
    console.log('Updated Vehicles List:', this.vehicles);
  }

  startEditing(vehicle: any) {
    vehicle.isEditing = true;
  }

  onStateChange() {
    if (this.selectedStates) {
      this.getMunicipalities(this.selectedStates);
    }
  }

  saveEditing(vehicle: any) {
    this.vehiclesService.updateVehicle(vehicle._id, vehicle).subscribe(
      (updatedVehicle) => {
        console.log('Vehicle updated successfully:', updatedVehicle);
      },
      (error) => {
        console.error('Error updating vehicle:', error);
      }
    );
    vehicle.isEditing = false;
  }

  cancelEditing(vehicle: any) {
    vehicle.isEditing = false;
  }

  deleteVehicle(id: any) {
   
    this.vehiclesService.deleteVehicle(id).subscribe(
      () => {
        console.log('deleted vehicle id:' + id);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Vehicle deleted!"
        });
      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }
  deleteArray(id: any) {
    this.vehicles.splice(id, 1);
  }

  getStates() {
    this.ubicationsService.getStates().subscribe(
      (data: any) => {
        this.states = data.provincias;
        this.selectedStates = this.vehicle?.state;
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
}
