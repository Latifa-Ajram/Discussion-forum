import { Component, OnInit } from '@angular/core';
import { ICategory } from './category';
import { Router } from '@angular/router';
import { Categorieservice } from './Categories.service';

@Component({
  selector: 'app-Categories-component',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})

export class CategoriesComponent implements OnInit {
  viewTitle: string = 'Categories';
  private _listfilter: string = "";

  Categories: ICategory[] = [];

  constructor(
    private _router: Router,
    private _Categorieservice: Categorieservice) { }

  
  get listFilter(): string {
    return this._listfilter;
  }
  set listFilter(value: string) {
    this._listfilter = value;
    console.log('Listfilter setMethod: ', value);
    this.filteredCategories = this.performFilter(value);
  }

  deleteCategory(category: ICategory): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${category.CategoryName}"?`);
    if (confirmDelete) {
      this._Categorieservice.deleteCategory(category.CategoryId).subscribe((response) => {
        if (response.success) {
          console.log(response.message);
          this.filteredCategories = this.filteredCategories.filter(c => c !== category);
        }
      },
        (error) => {
          console.error('Error deleting category: ', error);
        }
      );
    }
  }

  getCategories(): void {
    this._Categorieservice.getCategories().subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.Categories = data;
      this.filteredCategories = this.Categories;
    });
  }

  filteredCategories: ICategory[] = this.Categories;
  performFilter(filterBy: string): ICategory[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.Categories.filter((category: ICategory) =>
      category.CategoryName.toLocaleLowerCase().includes(filterBy));
  }

  navigateToCategoryform() {
    this._router.navigate(['/categoryform']);
  }

  ngOnInit(): void {
    console.log('CategoryComponent created');
    this.getCategories();
  }
}
