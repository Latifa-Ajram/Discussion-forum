import { Component, OnInit } from '@angular/core';
import { IRoom } from './room'; // Import the IRoom interface
import { Router } from '@angular/router';
import { RoomService } from './rooms.service'; // Import the RoomService

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  viewTitle: string = 'Rooms';
  private _listfilter: string = "";

  rooms: IRoom[] = [];

  constructor(
    private _router: Router,
    private _roomService: RoomService // Inject the RoomService
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

  getRooms(): void {
    this._roomService.getRooms().subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.rooms = data;
      this.filteredRooms = this.rooms;
    });
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
    console.log('RoomComponent created');
    this.getRooms();
  }
}
