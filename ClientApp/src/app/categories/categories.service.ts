import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from './category';  // Import the Category interface

@Injectable({
  providedIn: 'root'
})

export class Categorieservice {

  //The url to the api controller of this class
  private baseUrl = 'api/category/';

  //The httpclient talks to the targeted api. Passes along data and recives data.
  constructor(private _http: HttpClient) { }

  //Get all categories: Makes a call to the api wanting a list of all ICategory. The data recieved is passed on as a Observable to the Typescript file.
  getCategories(): Observable<any> {
    return this._http.get<ICategory[]>(this.baseUrl);
  }

  //Create a category: Posts a new category and the targeted api-url, recives and passe along an Observable.
  createCategory(newCategory: ICategory): Observable<any> {
    const createUrl = 'api/category/create';
    return this._http.post<any>(createUrl, newCategory);
  }

  //Get a category by its Id: Makes a request for a category with a certain Id, recives and passe along an Observable.
  getCategoryById(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/${categoryId}`;
    return this._http.get(url);
  }

  //Update a category: Passing a the new version of the category to the targeted api, recives and passe along an Observable.
  updateCategory(categoryId: number, newCategory: any): Observable<any> {
    const url = `${this.baseUrl}/update/${categoryId}`;
    newCategory.categoryId = categoryId;
    return this._http.put<any>(url, newCategory);
  }

  //Delete a category: Takes in and passes along an CategoryId, gets returned a observable. 
  deleteCategory(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${categoryId}`;
    return this._http.delete(url);
  }
}
