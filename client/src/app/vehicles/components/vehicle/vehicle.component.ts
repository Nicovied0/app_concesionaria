import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './../../../../services/Vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(private vehiclesService: VehiclesService, private router: Router) { }

  vehicles: any = []
  show : any = null

  ngOnInit() {
    this.getVehicles()
  }

  getVehicles() {
    this.vehiclesService.getVehicles().subscribe(
      res => {
        this.vehicles = res
        console.log(this.vehicles)
        this.show = true
      }
    )
  }

  goDetail(id: any) {
    this.router.navigate(['/vehicles/', id]);
  }


}
