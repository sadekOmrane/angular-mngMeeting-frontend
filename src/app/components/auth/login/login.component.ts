import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,public tokenServ: TokenService ,private router: Router, private userServ : UserService, private authServ : AuthService) { }
  validator = true;
  users !: any[];
  ngOnInit(): void {
  }

  onLogin(form : NgForm){
    
    if(form.valid){
      this.authService.login(form.value).subscribe(
        result => {
          this.tokenServ.saveToken(result.token);
          this.userServ.getUsers().subscribe(
            response => { 
              this.users = response["hydra:member"] ;
              for (let i = 0; i < this.users.length; i++) {
                if(this.users[i].email == this.authServ.user.email){
                  this.tokenServ.saveUser(this.users[i]);
                  break;
                }
              }
            }
          );
        },
        err => {
          console.log(err);
          this.validator = false;
        }
      );
  }
  }
}
