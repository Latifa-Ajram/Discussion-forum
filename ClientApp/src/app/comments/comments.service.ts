
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from './comment'; // Import the IComment interface

@Injectable({
    providedIn: 'root'
})

export class CommetnService {

    private baseUrl = 'api/comment/';

    constructor(private _http: HttpClient) { }

    getComment(): Observable<IComment[]> {
        return this._http.get<IComment[]>(this.baseUrl);
    }

    createComment(newComment: IComment): Observable<any> {
        const createUrl = 'api/post/create';
        return this._http.post<any>(createUrl, newComment);
    }


    updateComment(commentId: number, newComment: any): Observable<any> {
        const url = `${this.baseUrl}/update/${commentId}`;
        newComment.commentId = commentId;
        return this._http.put<any>(url, newComment);
    }

    deletePost(commentId: number): Observable<any> {
        const url = `${this.baseUrl}/delete/${commentId}`;
        return this._http.delete(url);
    }
}
