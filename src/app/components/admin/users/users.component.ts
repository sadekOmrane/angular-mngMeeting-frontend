import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/entity/department';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { User } from 'src/app/entity/user';
import { DepartmentService } from 'src/app/service/department.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user !: User;
  users !: User[];
  departments !: Department[];
  constructor( public deptServ:DepartmentService, public router : Router, public userServ : UserService) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('userForm') userForm !: NgForm;

  ngOnInit(): void {
    this.deptServ.getDepartments().subscribe(
      response => { this.departments = response["hydra:member"]; }
    );
    this.getUsers();
  }

  private getUsers():void{
    this.userServ.getUsers().subscribe( 
      response => { this.userServ.list = response["hydra:member"];
    }
    );
  }

  onDeleteUser(id : number): void{
    if (window.confirm('Are sure you want to delete this User ?')){
      this.userServ.deleteUser(id).subscribe(
        (response) => {
          console.log(response);
          this.getUsers();
        },
        (error:any) => console.log(error), 
        () => console.log('User deleted!')
      );
    }
    
  }

  
  onCreateClicked() : void{
    this.userForm.setValue({
      email : '',
      plainPassword : '',
      department : '',
    });
  }

  onCreateUser(user: User): void{
    document.getElementById("close-model-btn")?.click();
    let role1 = (<HTMLInputElement>document.getElementById("role1")).value;
    let role2 = (<HTMLInputElement>document.getElementById("role2")).value;
    user.roles = [role1, role2];
    this.userServ.createUser(user).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      },
      (error:any) => console.log(error), 
      () => console.log('User created!')
    );
    this.getUsers();
  }

  onUpdateClicked(id : number) : void{
    this.user = this.userServ.list.find((d) => {return d.id === id})!;
    this.updateForm.setValue({
      email: this.user.email,
      password: this.user.password,
      department: this.user.department,
    });
    let role1 = (<HTMLInputElement>document.getElementById("role1"));
    let role2 = (<HTMLInputElement>document.getElementById("role2"));
    
  }

  onUpdateUser(): void{
    document.getElementById("close-model-btn1")?.click();
    this.userServ.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('User updated!')
    );
  }

  getDeptName(str: string):String{
    for (let i = 0; i < this.departments?.length; i++) { 
      if("/api/departments/"+this.departments[i].id==str)
        return this.departments[i].libelle;
    }
    return '...';
  }
}
