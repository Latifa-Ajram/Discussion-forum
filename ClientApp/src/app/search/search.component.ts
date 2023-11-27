// search.component.ts

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

  search(): void {
    this.searchService.search(this.query).subscribe(
      result => {
        console.log('Search result:', result);
        this.router.navigate(['/search'], { queryParams: { searchResult: JSON.stringify(result) } });
      },
      error => {
        console.error('Error during search:', error);
      }
    );
  }



  }

