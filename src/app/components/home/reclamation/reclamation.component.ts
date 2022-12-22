import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/entity/reclamation';
import { Salle } from 'src/app/entity/salle';
import { User } from 'src/app/entity/user';
import { ReclamationService } from 'src/app/service/reclamation.service';
import { SalleService } from 'src/app/service/salle.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamation !: Reclamation;
  salles !: Salle[];
  user : User = new User();
  users !: User[];
  constructor( public recServ:ReclamationService, public salServ:SalleService, public userServ:UserService, public router : Router, private tokenServ : TokenService) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('reclamationForm') reclamationForm !: NgForm;

  ngOnInit(): void {
    
    this.getReclamations();
    this.salServ.getSalles().subscribe(
      response => { this.salles = response["hydra:member"]; }
    );
    this.userServ.getUsers().subscribe(
      response => { this.users = response["hydra:member"]; }
    );
    this.user = this.tokenServ.getUser();
  }

  private getReclamations():void{
    this.recServ.getReclamations().subscribe( 
      response => { this.recServ.list = response["hydra:member"];
    }
    );
  }

  onDeleteReclamation(id : number): void{
    if (window.confirm('Are sure you want to delete this Reclamation ?')){
      this.recServ.deleteReclamation(id).subscribe(
        (response) => {
          console.log(response);
          this.getReclamations();
        },
        (error:any) => console.log(error), 
        () => console.log('Reclamation deleted!')
      );
    }
    
  }

  onCreateClicked() : void{
    this.reclamationForm.setValue({
      description: '',
      salle: '',
    });
  }

  onCreateReclamation(reclamation: Reclamation): void{
    document.getElementById("close-model-btn")?.click();
    reclamation.dateRec = new Date();  //console.log(transformDate);
    let user : User = this.tokenServ.getUser();
    reclamation.proprietaire = "/api/users/"+user.id;
    reclamation.etat = false;
    this.recServ.createReclamation(reclamation).subscribe(
      (response) => {
        console.log(response);
        this.getReclamations();
      },
      (error:any) => console.log(error), 
      () => console.log('Reclamation created!')
    );
    this.getReclamations();
  }


  onUpdateClicked(id : number) : void{
    this.reclamation = this.recServ.list.find((d) => {return d.id === id})!;
    this.updateForm.setValue({
      description: this.reclamation.description,
      salle: this.reclamation.salle,
    });
    console.log(this.updateForm);
  }

  onUpdateReclamation(): void{
    document.getElementById("close-model-btn1")?.click();
    this.reclamation.description = this.updateForm.value.description;
    this.reclamation.salle = this.updateForm.value.salle;
    this.recServ.updateReclamation(this.reclamation).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('Reclamation updated!')
    );
  }

  ondetailClicked(id : number){
    this.reclamation = this.reclamation = this.recServ.list.find((d) => {return d.id === id})!;
  }

  traiterReclamation(){
    document.getElementById("close-model-btn2")?.click();
    this.reclamation.etat = true;
    this.recServ.updateReclamation(this.reclamation).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('Reclamation updated!')
    );
  }

  getSalleName(str: string):String{
    for (let i = 0; i < this.salles?.length; i++) { 
      if("/api/salles/"+this.salles[i].id==str)
        return this.salles[i].libelle;
    }
    return '';
  }

}
