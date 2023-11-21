import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './category';

@Injectable({
  providedIn: 'root'
})

export class Categorieservice {

  private baseUrl = 'api/category/';

  constructor(private _http: HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get<ICategory[]>(this.baseUrl);
  }

  createCategory(newCategory: ICategory): Observable<any> {
    const createUrl = 'api/category/create';
    return this._http.post<any>(createUrl, newCategory);
  }

  getCategoryById(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this._http.get(url);
  }

  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    const url = `${this.baseUrl}/update/${categoryId}`;
    newCategory.categoryId = categoryId;
    return this._http.put<any>(url, newCategory);
  }

  deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${categoryId}`;
    return this._http.delete(url);
  }
}
