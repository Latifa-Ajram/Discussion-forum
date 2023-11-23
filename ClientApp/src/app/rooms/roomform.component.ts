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

  roomForm: FormGroup;
  isEditMode: boolean = false;
  roomId: number = -1;
  categoryId: number = -1;
  categories: any[] = [];

  constructor(
    private _categoryService: Categorieservice,
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _roomService: RoomService
  ) {
    this.roomForm = this._formbuilder.group({
      roomName: ['', Validators.required],
      categoryId: [-1, [idValidator()]] // Set to zero until categories are retrieved
    });
  }

  ngOnInit(): void {
    this.fetchCategories();

    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false;
        this.categoryId = +params['categoryId']; //If the user came from a category to create a new room, then the id is not -1 and the category in the form is set by defualt, if not, it is -1.
        this.roomForm.patchValue({
          categoryId: this.categoryId
        })
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true;
        this.categoryId = +params['categoryId'];
        this.roomId = +params['roomId'];
        console.log("Dette er dataen, categoryId: " + this.categoryId + ", roomId: " + this.roomId);
        this.loadRoomForEdit(this.roomId);
      }
    });
  }
  fetchCategories(): void {
    this._categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }
 
  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.roomForm.get('categoryId')?.setValue(selectedCategoryId);
  }

  loadRoomForEdit(roomId: number) {
    this._roomService.getRoomById(roomId).subscribe((room: any) => {
      console.log('Room retrieved: ' + room);
      console.log('RoomName:' + room.RoomName);
      console.log('RoomId:' + room.RoomId);
      console.log('CategoryId' + room.CategoryId);
      this.roomForm.patchValue({
        roomName: room.RoomName,
        categoryId: room.CategoryId
      })
    },
     error => {
      console.error('Error loading room for Edit', error);
      });
  }


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

  backToRooms() {
    this._router.navigate(['/rooms', this.categoryId]);
  }
}

