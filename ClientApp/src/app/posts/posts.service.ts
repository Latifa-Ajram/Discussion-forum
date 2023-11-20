import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './post'; // Import the IPost interface

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private baseUrl = 'api/post/';

    constructor(private _http: HttpClient) { }

    getRooms(): Observable<IPost[]> {
        return this._http.get<IPost[]>(this.baseUrl);
    }

   
}
