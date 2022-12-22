import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  list !: any[];
  private baseUrl = "http://localhost:8000/api/users";
  constructor(private http:HttpClient) { }

  getUsers():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getUser(id : number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }

  updateUser(user:User):Observable<any>{
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteUser(id : number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
