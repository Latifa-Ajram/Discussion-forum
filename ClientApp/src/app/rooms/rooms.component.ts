import { Component, OnInit } from '@angular/core';
import { IRoom } from './room'; 
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './rooms.service'; 

@Component({
    selector: 'app-rooms-component',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
    
export class RoomsComponent implements OnInit {
  //Variables
  viewTitle: string = 'Rooms';
  private _listfilter: string = "";
  categoryId: number = -1;
  rooms: IRoom[] = [];
  filteredRooms: IRoom[] = this.rooms;

  //Constructor to initialize imported services:
  constructor(
      private _router: Router,
      private _roomService: RoomService,
      private _route: ActivatedRoute
  ) { }

  get listFilter(): string {
      return this._listfilter;
  }

  //The set-method of the list filter passes the current string provided by the user from the HTML-file.
  //This value is passed to the perform filter, where the outcome is passed back to the user.
  set listFilter(value: string) {
      this._listfilter = value;
      this.filteredRooms = this.performFilter(value);
  }

  //This method Takes in the passed room, checks with the user that it still wants to delete it, then passes it on to the service, and we subscribe for a callback.
  //We then recive the response from the back - end, if accepted then the filter is updated, if not, then an error is logged.
  deleteRoom(room: IRoom): void {
      const confirmDelete = confirm(`Are you sure you want to delete "${room.RoomName}"?`);
      if (confirmDelete) {
          this._roomService.deleteRoom(room.RoomId).subscribe((response) => {
              if (response.success) {
                  console.log(response.message);
                  this.filteredRooms = this.filteredRooms.filter(r => r !== room);
              }
          },
              (error) => {
                  console.error('Error deleting room: ', error);
              }
          );
      }
  }

  //Routing method that passes url, a string and an Id:
  createNewRoom() {
    this._router.navigate(['/roomform', 'create', this.categoryId]);
  }

  //Routing method that takes in an Id. passes url, a string and two different Id`s:
  updateSelectedRoom(roomId: number) {
    this._router.navigate(['/roomform', 'edit', this.categoryId, roomId])
  }

  //A method that invokes the get rooms in service and subscribes for a callback.
  //When the callback is recived, we then set it in the view by populating the lists corresponding with the view.
  getRooms(): void {
      this._roomService.getRooms().subscribe(data => {
          console.log('All', JSON.stringify(data));
          this.rooms = data;
          this.filteredRooms = this.rooms;
      });
  }

  //Gets all the rooms corresponding with the current categoryId set. The service passes the methods name and id. We subscribe for a callback.
  //This data populates the list of rooms we want to show.
  getRoomsByCategoryId(id: number): void {
      this._roomService.getRoomsByCategoryId(id).subscribe(data => {
          console.log('All', JSON.stringify(data));
          this.rooms = data;
          this.filteredRooms = this.rooms;
      })
  }

   //A method that returns a list of categories based on the passed string.
  performFilter(filterBy: string): IRoom[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.rooms.filter((room: IRoom) =>
          room.RoomName.toLocaleLowerCase().includes(filterBy));
  }

  //On intialization of this class this method runs and checks the routing for the value of the data:
  //If it is equal to - 1, then "getRooms()" is invoked, if not, then "getRoomsByCategoryId" is.
  ngOnInit(): void {
      this._route.params.subscribe(params => {
        if (params['id'] == -1) {
              this.getRooms();
        }
        else {
          this.getRoomsByCategoryId(+params['id']);
          this.categoryId = +params['id'];
        }
      });
  }
}
