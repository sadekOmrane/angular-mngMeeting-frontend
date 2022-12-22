import { Injectable } from '@angular/core';
import { Department } from '../entity/department';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  list !: Department[];
  private baseUrl = "http://localhost:8000/api/departments";
  constructor(private http:HttpClient) { }

  getDepartments():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getDepartment(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createDepartment(department:Department):Observable<Department>{
    return this.http.post<Department>(this.baseUrl, department);
  }

  updateDepartment(department:Department):Observable<any>{
    return this.http.put(`${this.baseUrl}/${department.id}`, department);
  }

  deleteDepartment(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
