import { Vehicles } from '../../../core/services/Vehicle.service';
import { SearchService } from '../../../core/services/Search.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  constructor(private searchService: SearchService, private router: Router) { }

  vehicles: Vehicles[] = [];
  searchQuery: string = '';

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.getVehicleBySearch(this.searchQuery);
    } else {
      this.vehicles = [];
    }
  }

  getVehicleBySearch(query: string) {
    this.searchService.search(query).subscribe(
      (res: any) => {
        this.vehicles = res.slice(0, 4);
      },
      (error:any) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
  

  goDetail(id: any) {
    this.router.navigate(['/vehicles/detail/', id]);
    window.scroll(0, 0)
  }


}
