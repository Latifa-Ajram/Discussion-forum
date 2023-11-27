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

  search(query: string): Observable<ISearch> {
    const encodedQuery = encodeURIComponent(query);

    console.log("Du har kommet til seach.service", encodedQuery)

    return this.http.get<ISearch>(`${this.apiUrl}?searchTerm=${encodedQuery}`)

      .pipe(
        catchError(this.handleError)

    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error during search:', error);
    return throwError('Internal Server Error');
  }
}
