import { Component, Input } from '@angular/core';
import { UbicationsService } from '../../../core/services/Ubications.service';
import { VehiclesService } from '../../../core/services/Vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent {
  @Input() vehicles: any[] = [];
  @Input() dealershipName: any;
  vehicle:any
  states: any;
  citys: any;
  selectedStates: any;
  selectedMunicipalities: any;

  constructor(
    private vehiclesService: VehiclesService,
    private ubicationsService: UbicationsService
  ) {
    
  }

  ngOnInit(): void {
    this.getStates();
   
    console.log(this.selectedStates);

  }

  startEditing(vehicle: any) {
    vehicle.isEditing = true;
  }
  onStateChange() {
    
    if (this.selectedStates) {
      this.getMunicipalities(this.selectedStates);
    }
    console.log('State seleccionado:', this.selectedStates);
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

  deleteVehicle(index: number) {
    this.vehicles.splice(index, 1);
  }

  getStates() {
    this.ubicationsService.getStates().subscribe(
      (data: any) => {
        this.states = data.provincias;
        // Inicializa selectedStates con el valor de vehicle.state
        this.selectedStates = this.vehicle.state;
        // Llama a onStateChange para actualizar la lista de municipios si vehicle.state ya tiene un valor
        this.onStateChange();
        console.log(this.states);
      },
      (error) => {
        console.error('Error obteniendo estados:', error);
      }
    );
  }
  getMunicipalities(selectedStates: any) {
    this.ubicationsService.getMunicipalities(selectedStates).subscribe(
      (data: any) => {
        this.citys = data.municipios; // Ajusta según la estructura real de tu respuesta
        console.log(this.citys);
      },
      (error) => {
        console.error('Error obteniendo municipios:', error);
      }
    );
  }
}
