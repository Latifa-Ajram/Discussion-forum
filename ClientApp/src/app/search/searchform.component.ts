
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchformComponent implements OnInit {
  searchResult: any;
  query: string = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

 
  ngOnInit(): void {
    // Subscribe to query parameters changes in the route
    this.route.queryParams.subscribe(params => {
      // Extract searchResult from query parameters and parse it from JSON
      const resultString = params['searchResult'];
      this.searchResult = JSON.parse(resultString);
      console.log("You have reached the search form:", this.searchResult);
    });
  }

  // Function to perform a search based on the provided query
  search(): void {
    // Invoke the search service with the current query
    this.searchService.search(this.query).subscribe(
      // Success callback
      result => {
        console.log('Search result:', result);
        // Navigate to the search route with the updated searchResult in query parameters
        this.router.navigate(['/search'], { queryParams: { searchResult: JSON.stringify(result) } });
      },
      // Error callback
      error => {
        console.error('Error during search:', error);
      }
    );
  }
}
