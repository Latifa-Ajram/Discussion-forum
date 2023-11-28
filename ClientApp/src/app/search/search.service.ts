import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ISearch } from '../search/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) { }

  // Function to perform a search based on the provided query
  search(query: string): Observable<ISearch> {
    // Encode the query to handle special characters in the URL
    const encodedQuery = encodeURIComponent(query);


    // Make an HTTP GET request to the search API endpoint with the encoded query 
    return this.http.get<ISearch>(`${this.apiUrl}?searchTerm=${encodedQuery}`)
      .pipe(
        // Handle errors using the private handleError method
        catchError(this.Error)
      );
  }

  // Private method to handle errors in the HTTP request
  private Error(error: HttpErrorResponse) {
    // Log an error message to the console with details of the error
    console.error('Error during search:', error);

    // Return an observable with a custom error message for the consumer
    return throwError('Internal Server Error');
  }
}
