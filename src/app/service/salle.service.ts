import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../entity/salle';

@Injectable({
  providedIn: 'root'
})
export class SalleService {
  list !: Salle[];
  private baseUrl = "http://localhost:8000/api/salles";
  constructor(private http:HttpClient) { }

  getSalles():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getSalle(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSalle(salle:Salle):Observable<Salle>{
    return this.http.post<Salle>(this.baseUrl, salle);
  }

  updateSalle(salle:Salle):Observable<any>{
    return this.http.put(`${this.baseUrl}/${salle.id}`, salle);
  }

  deleteSalle(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
