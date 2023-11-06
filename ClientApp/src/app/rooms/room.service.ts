import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from './room'; // Import the IRoom interface

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  private baseUrl = 'api/room/';

  constructor(private _http: HttpClient) { }

  getRooms(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(this.baseUrl);
  }

  createRoom(newRoom: IRoom): Observable<any> {
    const createUrl = 'api/room/create';
    return this._http.post<any>(createUrl, newRoom);
  }

  getRoomById(roomId: number): Observable<IRoom> {
    const url = `${this.baseUrl}/${roomId}`;
    return this._http.get<IRoom>(url);
  }

  updateRoom(roomId: number, updatedRoom: IRoom): Observable<any> {
    const url = `${this.baseUrl}/update/${roomId}`;
    updatedRoom.RoomId = roomId;
    return this._http.put<any>(url, updatedRoom);
  }

  deleteRoom(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${roomId}`;
    return this._http.delete(url);
  }
}
