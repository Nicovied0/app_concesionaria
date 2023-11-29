import { Vehicles } from 'src/services/Vehicle.service';
import { SearchService } from './../../../../services/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  vehicles: Vehicles[] = [];
  searchQuery: string = ''; // Initialize searchQuery

  ngOnInit() {
    // this.getVehicleBySearch(); // You might not want to fetch vehicles immediately on component initialization
  }

  onSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.getVehicleBySearch(this.searchQuery);
    } else {
      // Handle empty search query if needed
      this.vehicles = []; // Clear vehicles array or show a default list
    }
  }

  getVehicleBySearch(query: string) {
    this.searchService.search(query).subscribe(
      res => {
        console.log('query:', query);
        this.vehicles = res;
      },
      error => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
