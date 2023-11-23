import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorieservice } from './categories.service';

@Component({
  selector: "app-Categories-categoryform",
  templateUrl: "./categoryform.component.html",
  styleUrls: ['./Categories.component.css']
})

export class CategoryformComponent {
  //Variables:
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  categoryId: number = -1;


  //Initilizing imported services and the form we are using inside the view in order to populate it:
  constructor(private _formbuilder: FormBuilder, private _router: Router, private _route: ActivatedRoute, private _Categorieservice: Categorieservice) {
    this.categoryForm = _formbuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  //This method is invoked when the submit button is clicked via the eventcall from the form. The forms values are retrieved and set inside the newCategory object.
  //If this was an edit of a existing category, then we invoke the updateCategory method from the service and subscribe for a callback.
  //If not, then we invoke the createCategory from the service and subscribe for the callback from it. If they succeed, then we are passed back to the list of all categories:
  onSubmit(){
    console.log("CategoryCreate form submitted");
    console.log(this.categoryForm);

    const newCategory = this.categoryForm.value;

    if (this.isEditMode) {
      this._Categorieservice.updateCategory(this.categoryId, newCategory).subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/Categories']);
        }
        else {
          console.log('Category update failed');
        }
      });
    }
    else {
      this._Categorieservice.createCategory(newCategory).subscribe(response => {
            if (response.success) {
              console.log(response.message);
              this._router.navigate(['/Categories']);
            }
            else {
              console.log('Category creation failed');
            }
          });
    }
    
  }

  //A method connected to a button that routes us back to categories
  backToCategories() {
    this._router.navigate(['/Categories']);
  }

  //A method invoked when the class is initialized. Depending on the params different data is set.
  //If the parameters is like "edit", then we also set the data by getting the specific category:
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; //create mode
      }
      else if (params['mode'] === 'edit') {
        this.isEditMode = true; //Edit mode
        this.categoryId = +params['id']; //convert the following id to a number
        this.loadCategoryForEdit(this.categoryId);
      }
    });
  }

  //Method that takes in a category id, uses the service to invoke the getCategoryById and subscribes for the callback. When the data returns,
  //it is patched into the form, but if it fails, then data is logged instead:
  loadCategoryForEdit(categoryId: number) {
    this._Categorieservice.getCategoryById(categoryId).subscribe((category: any) => {
      console.log('Category retrieved: ' + category);
      this.categoryForm.patchValue({
        categoryName: category.CategoryName
      });
    },
      (error: any) => {
        console.error('Error loading category for Edit', error);
      }
    );
  }
}
