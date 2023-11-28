
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';

  constructor(private searchService: SearchService, private router: Router) { }

  // Function to initiate the search process
  search(): void {
    // Call the search service to perform the search operation
    this.searchService.search(this.query).subscribe(
      // Success callback
      result => {
      
        // Navigate to the search route with the search result as a query parameter
        this.router.navigate(['/search'], { queryParams: { searchResult: JSON.stringify(result) } });

        // Clear the search query after the search is performed
        this.query = '';
      },
      // Error callback
      error => {
        // Log an error message to the console in case of search failure
        console.error('Error during search:', error);
      }
    );
  }
}
