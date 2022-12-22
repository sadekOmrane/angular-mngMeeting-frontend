import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../entity/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  list !: Reclamation[];
  private baseUrl = "http://127.0.0.1:8000/api/reclamations";
  constructor(private http:HttpClient) { }

  getReclamations():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getReclamation(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  createReclamation(reclamation:Reclamation):Observable<Reclamation>{
    return this.http.post<Reclamation>(this.baseUrl, reclamation);
  }

  updateReclamation(reclamation:Reclamation):Observable<any>{
    return this.http.put(`${this.baseUrl}/${reclamation.id}`, reclamation);
  }

  deleteReclamation(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
