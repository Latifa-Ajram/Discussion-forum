import { Component, OnInit } from '@angular/core';
import { IRoom } from './room'; // Import the IRoom interface
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from './rooms.service'; // Import the RoomService

@Component({
    selector: 'app-rooms-component',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.css']
})
    
export class RoomsComponent implements OnInit {
  viewTitle: string = 'Rooms';
  private _listfilter: string = "";
  categoryId: number = -1;
  rooms: IRoom[] = [];

  constructor(
      private _router: Router,
      private _roomService: RoomService,
      private _route: ActivatedRoute
  ) { }

  get listFilter(): string {
      return this._listfilter;
  }
  set listFilter(value: string) {
      this._listfilter = value;
      console.log('Listfilter setMethod: ', value);
      this.filteredRooms = this.performFilter(value);
  }

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

  createNewRoom() {
    this._router.navigate(['/roomform', 'create', this.categoryId]);
  }

  updateSelectedRoom(roomId: number) {
    this._router.navigate(['/roomform', 'edit', this.categoryId, roomId])
  }

  getRooms(): void {
      this._roomService.getRooms().subscribe(data => {
          console.log('All', JSON.stringify(data));
          this.rooms = data;
          this.filteredRooms = this.rooms;
      });
  }

  getRoomsByCategoryId(id: number): void {
      this._roomService.getRoomsByCategoryId(id).subscribe(data => {
          console.log('All', JSON.stringify(data));
          this.rooms = data;
          this.filteredRooms = this.rooms;
      })
  }

  filteredRooms: IRoom[] = this.rooms;
  performFilter(filterBy: string): IRoom[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.rooms.filter((room: IRoom) =>
          room.RoomName.toLocaleLowerCase().includes(filterBy));
  }

  navigateToRoomform() {
      this._router.navigate(['/roomform']);
  }

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
