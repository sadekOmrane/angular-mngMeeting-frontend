import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Department } from 'src/app/entity/department';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  department !: Department;
  constructor( public deptServ:DepartmentService, public router : Router) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('departmentForm') departmentForm !: NgForm;

  ngOnInit(): void {
    this.getDepartments();
    
  }

  private getDepartments():void{
    this.deptServ.getDepartments().subscribe( 
      response => { this.deptServ.list = response["hydra:member"];
    }
    );
  }

  onDeleteDepartment(id : number): void{
    if (window.confirm('Are sure you want to delete this Catégorie ?')){
      this.deptServ.deleteDepartment(id).subscribe(
        (response) => {
          console.log(response);
          this.getDepartments();
        },
        (error:any) => console.log(error), 
        () => console.log('department deleted!')
      );
    }
    
  }

  onCreateClicked() : void{
    this.departmentForm.setValue({
      libelle: ''
    });
    
  }

  onCreateDepartment(department: Department): void{
    document.getElementById("close-model-btn")?.click();
    this.deptServ.createDepartment(department).subscribe(
      (response) => {
        console.log(response);
        this.getDepartments();
      },
      (error:any) => console.log(error), 
      () => console.log('department created!')
    );
  }


  onUpdateClicked(id : number) : void{
    this.department = this.deptServ.list.find((d) => {return d.id === id})!;
    this.updateForm.setValue({
      libelle: this.department.libelle
    });
  }

  onUpdateDepartment(): void{
    document.getElementById("close-model-btn1")?.click();
    this.department.libelle = this.updateForm.value.libelle;
    this.deptServ.updateDepartment(this.department).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('department updated!')
    );
  }

  
}
