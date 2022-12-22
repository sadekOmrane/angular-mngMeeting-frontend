import { Injectable } from '@angular/core';
import { Notification } from '../entity/notification';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  list : any[] = [];
  private baseUrl = "http://localhost:8000/api/notifications";
  constructor(private http:HttpClient) { }

  getNotifications():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getNotification(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createNotification(Notification:Notification):Observable<Notification>{
    return this.http.post<Notification>(this.baseUrl, Notification);
  }

  updateNotification(Notification:Notification):Observable<any>{
    return this.http.put(`${this.baseUrl}/${Notification.id}`, Notification);
  }

  deleteNotification(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
