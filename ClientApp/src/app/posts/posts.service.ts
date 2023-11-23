import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from './post'; // Import the Post interface

@Injectable({
    providedIn: 'root'
})
export class PostService {

  //The url to the api controller of this class
    private baseUrl = 'api/post/';

     //The httpclient talks to the targeted api. Passes along data and recives data.
    constructor(private _http: HttpClient) { }

    //Get all posts: Makes a call to the api wanting a list of all Postss. The data recieved is passed on as a Observable to the Typescript file.
    getPosts(): Observable<IPost[]> {
        return this._http.get<IPost[]>(this.baseUrl);
    }

     //Create Post: Posts a new post and the targeted api-url, recives and passe along an Observable.
    createPost(newPost: IPost): Observable<any> {
      const createUrl = 'api/post/create';
      return this._http.post<any>(createUrl, newPost);
    }

    //Get a post by its Id: Makes a request for a post with a certain Id, recives and passe along an Observable.
    getPostById(postId: number): Observable<any> {
      const url = `${this.baseUrl}/${postId}`;
      return this._http.get(url);
    }

    //Get Posts by Topuc Id: Sends the TopicId to the targeted api to fetch the posts inside this room. Returns a observable.
    getPostsByTopicId(topicId: number): Observable<any> {
      const url = `${this.baseUrl}/byTopicId/${topicId}`;
      return this._http.get(url);
    }

    //Update a post: Passing a the new version of the post to the targeted api, recives and passe along an Observable.
    updatePost(postId: number, newPost: any): Observable<any> {
      const url = `${this.baseUrl}/update/${postId}`;
      newPost.postId = postId;
      return this._http.put<any>(url, newPost);
    }

    //Delete a post: Takes in and passes along an PostId, gets returned a observable.
    deletePost(postId: number): Observable<any> {
      const url = `${this.baseUrl}/delete/${postId}`;
      return this._http.delete(url);
    }
}
