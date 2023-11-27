// searchform.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Legg til Router import
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchformComponent implements OnInit {
  searchResult: any;
  query: string = '';

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { } // Fjernet det ekstra kommaet
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const resultString = params['searchResult'];
      this.searchResult = JSON.parse(resultString);
      console.log("Du har kommet til search.form", this.searchResult);
    });
  }

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
