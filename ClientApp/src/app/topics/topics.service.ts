
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITopic } from './topic'; // Import your item model

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private baseUrl = 'api/topic/';

  constructor(private _http: HttpClient) { }

  getTopics(): Observable<ITopic[]> {
    return this._http.get<ITopic[]>(this.baseUrl);
  }

  createTopic(newTopic: ITopic): Observable<any> {
    const createUrl = 'api/topic/create';
    return this._http.post<any>(createUrl, newTopic);
  }

  getItemById(topicId: number): Observable<any> {
    const url = `${this.baseUrl}/${topicId}`;
    return this._http.get(url);
  }

  updateTopic(topicId: number, newTopic: any): Observable<any> {
    const url = `${this.baseUrl}/update/${topicId}`;
    newTopic.topicId = topicId;
    return this._http.put<any>(url, newTopic);
  }

  deleteTopic(topicId: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${topicId}`;
    return this._http.delete(url);
  }
}
