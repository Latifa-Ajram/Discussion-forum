import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './rooms.service';
import { Categorieservice } from '../categories/categories.service';
import { idValidator } from '../services/IDValidator';

@Component({
  selector: "app-rooms-roomform",
  templateUrl: "./roomform.component.html",
  styleUrls: ['./rooms.component.css']
})
export class RoomformComponent implements OnInit {
  //Variables:
  roomForm: FormGroup;
  isEditMode: boolean = false;
  roomId: number = -1;
  categoryId: number = -1;
  categories: any[] = [];

  //Initilizing imported services and the form we are using inside the view in order to populate it:
  constructor(
    private _categoryService: Categorieservice,
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _roomService: RoomService
  ) {
    this.roomForm = this._formbuilder.group({
      roomName: ['', Validators.required],
      categoryId: [-1, [idValidator()]] 
    });
  }

  //A method invoked when the class is initialized. First we call for a method to fetch all categories to populate them in the selcet option
  //Depending on the params different data is set. If the mode is create we patch the category Id to set the current category we are trying create a room inside.
  //If the parameters is like "edit", then we also set the data by getting the specific room:
  ngOnInit(): void {
    this.fetchCategories();

    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') { // Create mode
        this.isEditMode = false;
        this.categoryId = +params['categoryId']; //If the user came from a category to create a new room, then the id is not -1 and the category in the form is set by defualt, if not, it is -1.
        this.roomForm.patchValue({
          categoryId: this.categoryId
        })
      } else if (params['mode'] === 'edit') { // Edit mode
        this.isEditMode = true;
        this.categoryId = +params['categoryId']; // Convert to number
        this.roomId = +params['roomId']; // Convert to number
        console.log("Dette er dataen, categoryId: " + this.categoryId + ", roomId: " + this.roomId);
        this.loadRoomForEdit(this.roomId);
      }
    });
  }
  //Using the service to invoke the getCategories() and subscribe for a callback. When the categories are retrieved they are populated into the list:
  fetchCategories(): void {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  //A method invoked on event change in the HTML-page. We retrieve the current set value and set the text based on the id-value:
  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.roomForm.get('categoryId')?.setValue(selectedCategoryId);
  }

  //Method that takes in a room id, uses the service to invoke the getRoomById and subscribes for the callback. When the data returns,
  //it is patched into the form, but if it fails, then data is logged instead:
  loadRoomForEdit(roomId: number) {
    this._roomService.getRoomById(roomId).subscribe((room: any) => {
      this.roomForm.patchValue({
        roomName: room.RoomName,
        categoryId: room.CategoryId
      })
    },
     error => {
      console.error('Error loading room for Edit', error);
      });
  }

  //This method is invoked when the submit button is clicked via the eventcall from the form. The forms values are retrieved and set inside the newRoom object.
  //If this was an edit of a existing room, then we invoke the updateRoom method from the service and subscribe for a callback.
  //If not, then we invoke the createRoom from the service and subscribe for the callback from it. If they succeed, then we are passed back to the list of all rooms:
  onSubmit() {
    console.log('Form Submitted', this.roomForm.valid, this.roomForm.value);
    console.log("RoomCreate form submitted");
    console.log(this.roomForm.value);

    const newRoom = this.roomForm.value;

    if (this.isEditMode) {
      // Updating room
      this._roomService.updateRoom(this.roomId, newRoom).subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/rooms', this.categoryId]);
        } else {
          console.log('Room update failed');
        }
      });
    } else {
      // Creating a new room
       this._roomService.createRoom(newRoom).subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/rooms', this.categoryId]);
        } else {
          console.log('Room creation failed');
        }
      });
    }
  }

  //A method connected to a button that routes us back to rooms
  backToRooms() {
    this._router.navigate(['/rooms', this.categoryId]);
  }
}

