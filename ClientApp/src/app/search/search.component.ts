import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { SearchService } from '../search/search.service';
import { ISearch } from './search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  searchResult: ISearch | null = null;  // Ensure this property is declared

  constructor(private searchService: SearchService) { }

  search(): void {
    if (this.query.trim() === '') {
      // Don't perform an empty search
      return;
    }

    this.searchService.search(this.query).subscribe(
      result => {
        this.searchResult = result;  // Assign the result to the searchResult property
      },
      error => {
        console.error('Error during search:', error);
      }
    );
  }
}
@NgModule({

  imports: [
    FormsModule,
  ],
})
export class SearchModule { }
