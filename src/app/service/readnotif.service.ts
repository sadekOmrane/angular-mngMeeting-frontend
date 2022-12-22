import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReadedNotification } from '../entity/readednotification';

@Injectable({
  providedIn: 'root'
})
export class ReadedNotificationService {
  list : any[] = [];
  private baseUrl = "http://localhost:8000/api/readed_notifications";
  constructor(private http:HttpClient) { }

  getReadedNotifications():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getReadedNotification(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createReadedNotification(ReadedNotification:ReadedNotification):Observable<ReadedNotification>{
    return this.http.post<ReadedNotification>(this.baseUrl, ReadedNotification);
  }

  updateReadedNotification(ReadedNotification:ReadedNotification):Observable<any>{
    return this.http.put(`${this.baseUrl}/${ReadedNotification.id}`, ReadedNotification);
  }

  deleteReadedNotification(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
