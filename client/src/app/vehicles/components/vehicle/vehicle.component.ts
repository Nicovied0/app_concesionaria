import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './../../../../services/Vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit{

  constructor(private  vehiclesService : VehiclesService){}

  vehicles: any = []

  ngOnInit() {
    this.getVehicles()
  }

  getVehicles(){
      this.vehiclesService.getVehicles().subscribe(
        res =>{
          this.vehicles = res
        }
      )
  }

}
