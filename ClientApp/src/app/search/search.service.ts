import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISearch } from '../search/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = '/api/search';

  constructor(private http: HttpClient) { }

  search(query: string): Observable<ISearch> {
    return this.http.get<ISearch>(`${this.apiUrl}?searchTerm=${query}`);
  }
}
