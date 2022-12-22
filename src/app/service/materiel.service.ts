import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materiel } from '../entity/materiel';

@Injectable({
  providedIn: 'root'
})
export class MaterielService {
  list !: Materiel[];
  private baseUrl = "http://127.0.0.1:8000/api/materiels";
  constructor(private http:HttpClient) { }

  getMateriels():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getMateriel(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  
  createMateriel(materiel:Materiel):Observable<Materiel>{
    return this.http.post<Materiel>(this.baseUrl, materiel);
  }

  updateMateriel(materiel:Materiel):Observable<any>{
    return this.http.put(`${this.baseUrl}/${materiel.id}`, materiel);
  }

  deleteMateriel(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
