import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/entity/department';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  departments!: Department;
  user !: User
  constructor( public deptServ:DepartmentService,  public tokenServ: TokenService ,private router: Router, public authServ : AuthService) { }


  ngOnInit(): void {
    this.user = this.tokenServ.getUser()
  }

  
}
