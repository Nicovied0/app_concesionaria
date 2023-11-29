import { Vehicles } from 'src/services/Vehicle.service';
import { SearchService } from './../../../../services/search.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  constructor(private searchService: SearchService) { }

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
      res => {
        console.log('Query:', query);
        console.log('Search Result:',  this.vehicles);
        this.vehicles = res; // Update vehicles based on the search result
      },
      error => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
