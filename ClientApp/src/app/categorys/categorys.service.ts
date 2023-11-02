import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private baseUrl = 'api/category/';

  constructor(private _http: HttpClient) { }

  getCategorys(): Observable<any> {
    return this._http.get<ICategory[]>(this.baseUrl);
  }

  createCategory(newCategory: ICategory): Observable<any> {
    const createUrl = 'api/category/create';
    return this._http.post<any>(createUrl, newCategory);
  }
}
