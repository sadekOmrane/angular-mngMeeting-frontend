import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../entity/user';
import { TokenService } from './token.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:  HttpClient, private userServ : UserService,private tokenServ: TokenService, private router: Router) { }
  public user !: User;
  private users !: User[];

  login(user:any): Observable<any> {
    this.user = user;
    return this.http.post("http://127.0.0.1:8000/api/login", user);
  }
  Logout(){
    this.tokenServ.removeToken();
    this.tokenServ.removeUser();
    this.router.navigate(['/login']);
  }
}
