import { Component, OnInit } from '@angular/core';
import { ICategory } from './category';
import { Router } from '@angular/router';
import { Categorieservice } from './categories.service';

@Component({
  selector: 'app-Categories-component',
  templateUrl: './Categories.component.html',
  styleUrls: ['./Categories.component.css']
})

export class CategoriesComponent implements OnInit {
  //Variables:
  viewTitle: string = 'Categories';
  private _listfilter: string = "";
  Categories: ICategory[] = [];
  filteredCategories: ICategory[] = this.Categories;

  //Constructor to initialize imported services:
  constructor(
    private _router: Router,
    private _Categorieservice: Categorieservice) { }


  
  get listFilter(): string {
    return this._listfilter;
  }

  //The set-method of the list filter passes the current string provided by the user from the HTML-file.
  //This value is passed to the perform filter, where the outcome is passed back to the user.
  set listFilter(value: string) {
    this._listfilter = value;
    this.filteredCategories = this.performFilter(value);
  }

  //This method Takes in the passed category, checks with the user that it still wants to delete it, then passes it on to the service, and we subscribe for a callback.
  //We then recive the response from the back - end, if accepted then the filter is updated, if not, then an error is logged.
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

  //A method that invokes the get categories in service and subscribes for a callback.
  //When the callback is recived, we then set it in the view by populating the lists corresponding with the view.
  getCategories(): void {
    this._Categorieservice.getCategories().subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.Categories = data;
      this.filteredCategories = this.Categories;
    });
  }


  //A method that returns a list of categories based on the passed string.
  performFilter(filterBy: string): ICategory[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.Categories.filter((category: ICategory) =>
      category.CategoryName.toLocaleLowerCase().includes(filterBy));
  }

  //A routing-method to get to the category-form
  navigateToCategoryform() {
    this._router.navigate(['/categoryform']);
  }

  //On intialization of this class this method runs and invokes to get categoreis method ():
  ngOnInit(): void {
    console.log('CategoryComponent created');
    this.getCategories();
  }
}
