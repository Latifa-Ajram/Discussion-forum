import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRoom } from './room'; // Import the Room interface

@Injectable({
  providedIn: 'root'
})

export class RoomService {

  //The url to the api controller of this class
  private baseUrl = 'api/room/';

   //The httpclient talks to the targeted api. Passes along data and recives data.
  constructor(private _http: HttpClient) { }

  //Get all rooms: Makes a call to the api wanting a list of all Rooms. The data recieved is passed on as a Observable to the Typescript file.
  getRooms(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(this.baseUrl);
  }

  //Create room: Posts a new room and the targeted api-url, recives and passe along an Observable.
  createRoom(newRoom: IRoom): Observable<any> {
    const createUrl = 'api/room/create';
    return this._http.post<any>(createUrl, newRoom);
  }

  //Get Rooms by Category Id: Sends the category Id to the targeted api to fetch the rooms inside this category. Returns a observable.
    getRoomsByCategoryId(categoryId: number): Observable<any> {
    const url = `${this.baseUrl}/byCategoryId/${categoryId}`;
    return this._http.get<IRoom[]>(url);
  }

  //Get a room by its Id: Makes a request for a room with a certain Id, recives and passe along an Observable.
  getRoomById(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/${roomId}`;
    return this._http.get<IRoom>(url);
  }

  //Update a room: Passing a the new version of the room to the targeted api, recives and passe along an Observable.
  updateRoom(roomId: number, updatedRoom: IRoom): Observable<any> {
    const url = `${this.baseUrl}/update/${roomId}`;
    updatedRoom.RoomId = roomId;
    return this._http.put<any>(url, updatedRoom);
  }

  //Delete a room: Takes in and passes along an RoomId, gets returned a observable. 
  deleteRoom(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${roomId}`;
    return this._http.delete(url);
  }

  //Requests an object from the server based on a passed number.
  //Request an observable with a property categoryName which is some string.
  getCategoryNameById(categoryId: number): Observable<{ categoryName: string }> {
    const url = `${this.baseUrl}/categoryName/${categoryId}`;
    return this._http.get<{ categoryName: string }>(url);
  }
}
