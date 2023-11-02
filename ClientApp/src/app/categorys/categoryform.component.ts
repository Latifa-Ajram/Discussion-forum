import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from './categorys.service';

@Component({
  selector: "app-categorys-categoryform",
  templateUrl: "./categoryform.component.html"
})

export class CategoryformComponent {

  categoryForm: FormGroup;

  constructor(private _formbuilder: FormBuilder, private _router: Router, private _categoryService: CategoryService) {
    this.categoryForm = _formbuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log("CategoryCreate form submitted");
    console.log(this.categoryForm);

    const newCategory = this.categoryForm.value;
    this._categoryService.createCategory(newCategory).subscribe(response => {
      if (response.success) {
        console.log(response.message);
        this._router.navigate(['/categorys']);
      }
      else {
        console.log('Category creation failed');
      }
    });
  }

  backToCategories() {
    console.log("backToCategories called!")
    this._router.navigate(['/categorys']);
  }
}
