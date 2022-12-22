import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reservation } from '../entity/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  list !: Reservation[];
  private baseUrl = "http://127.0.0.1:8000/api/reservations";
  constructor(private http:HttpClient) { }

  getReservations():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getReservation(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  createReservation(reservation:Reservation):Observable<Reservation>{
    return this.http.post<Reservation>(this.baseUrl, reservation);
  }

  updateReservation(reservation:Reservation):Observable<any>{
    return this.http.put(`${this.baseUrl}/${reservation.id}`, reservation);
  }

  deleteReservation(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
