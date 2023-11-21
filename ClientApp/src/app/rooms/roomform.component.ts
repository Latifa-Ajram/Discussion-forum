import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './rooms.service'; // Import the RoomService

@Component({
  selector: "app-rooms-roomform",
  templateUrl: "./roomform.component.html"

})

export class RoomformComponent {

  roomForm: FormGroup;
  isEditMode: boolean = false;
  roomId: number = -1;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
  
    private _roomService: RoomService // Inject the RoomService
  ) {
    this.roomForm = _formbuilder.group({
      roomName: ['', Validators.required],
       categoryId: [1, Validators.required]//  CategoryId 1 for å teste, men Id må oppdateres!
    });
  }

  onSubmit() {
    console.log("RoomCreate form submitted");
    console.log(this.roomForm);

    const newRoom = this.roomForm.value;
  
    


    if (this.isEditMode) {
      this._roomService.updateRoom(this.roomId, newRoom).subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/rooms']);
        } else {
          console.log('Room update failed');
        }
      });
    } else {
      this._roomService.createRoom(newRoom).subscribe(response => {
        if (response.success) {
          console.log(response.message);
          this._router.navigate(['/rooms']);
        } else {
          console.log('Room creation failed');
        }
      });
    }
  }

  backToRooms() {
    this._router.navigate(['/rooms']);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.roomId = +params['id']; // Convert the following id to a number
        this.loadRoomForEdit(this.roomId);
      }
    });
  }

  loadRoomForEdit(roomId: number) {
    this._roomService.getRoomById(roomId).subscribe((room: any) => {
      console.log('Room retrieved: ' + room);
      this.roomForm.patchValue({
        roomName: room.RoomName
      });
    }, (error: any) => {
      console.error('Error loading room for Edit', error);
    });
  }
}
