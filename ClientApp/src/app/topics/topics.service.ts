
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopic } from './topic'; // Import the Topic interface

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  //The url to the api controller of this class
  private baseUrl = 'api/topic/';

  //The httpclient talks to the targeted api. Passes along data and recives data.
  constructor(private _http: HttpClient) { }

   //Get all topics: Makes a call to the api wanting a list of all Topics. The data recieved is passed on as a Observable to the Typescript file.
  getTopics(): Observable<ITopic[]> {
    return this._http.get<ITopic[]>(this.baseUrl);
  }

  //Create rtopic: Posts a new topic and the targeted api-url, recives and passe along an Observable.
  createTopic(newTopic: ITopic): Observable<any> {
    const createUrl = 'api/topic/create';
    return this._http.post<any>(createUrl, newTopic);
  }

  //Get a topic by its Id: Makes a request for a topic with a certain Id, recives and passe along an Observable.
  getTopicById(topicId: number): Observable<any> {
    const url = `${this.baseUrl}/${topicId}`;
    return this._http.get(url);
  }

  //Get Topics by Room Id: Sends the RooomId to the targeted api to fetch the topics inside this room. Returns a observable.
  getTopicsByRoomId(roomId: number): Observable<any> {
    const url = `${this.baseUrl}/byRoomId/${roomId}`
    return this._http.get(url);
  }

  //Update a topic: Passing a the new version of the topic to the targeted api, recives and passe along an Observable.
  updateTopic(topicId: number, newTopic: any): Observable<any> {
    const url = `${this.baseUrl}/update/${topicId}`;
    newTopic.topicId = topicId;
    return this._http.put<any>(url, newTopic);
  }

   //Delete a topic: Takes in and passes along an TopicId, gets returned a observable. 
  deleteTopic(topicId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${topicId}`;
    return this._http.delete(url);
  }
}
