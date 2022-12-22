import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
    this.router.navigate(['/home/reservation']);
  }

  saveUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  isLogged():boolean{
    const token = localStorage.getItem('token');

    return !! token;
  }

  getToken(): string | null{
    return localStorage.getItem('token');

  }


  getUser() : any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  removeUser(){
    localStorage.removeItem('user');
  }

  removeToken(){
    localStorage.removeItem('token');
  }
  
}
