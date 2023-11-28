
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from './comment'; // Import the Comment interface

@Injectable({
    providedIn: 'root'
})

export class CommentService {

  //The url to the api controller of this class
  private baseUrl = 'api/comment/';

  //The httpclient talks to the targeted api. Passes along data and recives data.
  constructor(private _http: HttpClient) { }

  //Get all comments: Makes a call to the api wanting a list of all comments. The data recieved is passed on as a Observable to the Typescript file.
  getComment(): Observable<IComment[]> {
      return this._http.get<IComment[]>(this.baseUrl);
  }

  //Create Comment: Posts a new comment and the targeted api-url, recives and passe along an Observable.
  createComment(newComment: IComment): Observable<any> {
    const createUrl = 'api/comment/create';
    return this._http.post<any>(createUrl, newComment);
  }

  //Get a comment by its Id: Makes a request for a comment with a certain Id, recives and passe along an Observable.
  getCommentById(commentId: number): Observable<any> {
    const url = `${this.baseUrl}/${commentId}`;
    return this._http.get(url);
  }

  //Get Comments by Post Id: Sends the PostId to the targeted api to fetch the comments inside this post. Returns a observable.
  getCommentsByPostId(postId: number): Observable<any> {
    const url = `${this.baseUrl}/byPostId/${postId}`;
    return this._http.get(url);
  }

  //Update a comment: Passing a the new version of the comment to the targeted api, recives and passe along an Observable.
  updateComment(commentId: number, newComment: any): Observable<any> {
      const url = `${this.baseUrl}/update/${commentId}`;
      newComment.commentId = commentId;
      return this._http.put<any>(url, newComment);
  }

  //Delete a comment: Takes in and passes along an CommmentId, gets returned a observable.
  deletePost(commentId: number): Observable<any> {
      const url = `${this.baseUrl}/delete/${commentId}`;
      return this._http.delete(url);
  }

  //Requests an object from the server based on a passed number.
  //Request an observable with a property roomName which is some string.
  getPostNameById(postId: number): Observable<{ postName: string }> {
    const url = `${this.baseUrl}/postName/${postId}`;
    return this._http.get<{ postName: string }>(url);
  }
}
