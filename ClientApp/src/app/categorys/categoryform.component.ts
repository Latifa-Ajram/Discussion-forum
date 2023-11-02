import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: "app-categorys-categoryform",
  templateUrl: "./categoryform.component.html"
})

export class CategoryformComponent {

  categoryForm: FormGroup;

  constructor(private _formbuilder: FormBuilder, private _router: Router) {
    this.categoryForm = _formbuilder.group({
      categoryName: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log("CategoryCreate form submitted");
    console.log(this.categoryForm);
    console.log('The category ' + this.categoryForm.value.categoryName + ' is created.');
    console.log(this.categoryForm.touched);
  }

  backToCategories() {
    console.log("backToCategories called!")
    this._router.navigate(['/categorys']);
  }
}
