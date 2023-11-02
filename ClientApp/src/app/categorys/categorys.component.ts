import { Component, OnInit } from '@angular/core';
import { ICategory } from './category';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorys-component',
  templateUrl: './categorys.component.html',
  styleUrls: ['./categorys.component.css']
})

export class CategorysComponent implements OnInit {
  viewTitle: string = 'Categories';
  private _listfilter: string = "";

  categorys: ICategory[] = [];

  constructor(private _http: HttpClient, private _router: Router) { }

  
  get listFilter(): string {
    return this._listfilter;
  }
  set listFilter(value: string) {
    this._listfilter = value;
    console.log('Listfilter setMethod: ', value);
    this.filteredCategorys = this.performFilter(value);
  }

  getCategorys(): void {
    this._http.get<ICategory[]>("api/category/").subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.categorys = data;
      this.filteredCategorys = this.categorys;
    });
  }

  filteredCategorys: ICategory[] = this.categorys;
  performFilter(filterBy: string): ICategory[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.categorys.filter((category: ICategory) =>
      category.CategoryName.toLocaleLowerCase().includes(filterBy));
  }

  navigateToCategoryform() {
    this._router.navigate(['/categoryform']);
  }

  ngOnInit(): void {
    console.log('CategoryComponent created');
  }
}
