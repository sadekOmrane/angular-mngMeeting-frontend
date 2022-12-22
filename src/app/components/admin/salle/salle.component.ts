import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Salle } from 'src/app/entity/salle';
import { SalleService } from 'src/app/service/salle.service';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.css']
})
export class SalleComponent implements OnInit {
  salle !: Salle;
  constructor( public salServ:SalleService, public router : Router) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('salleForm') salleForm !: NgForm;

  ngOnInit(): void {
    this.getSalles();
  }

  private getSalles():void{
    this.salServ.getSalles().subscribe( 
      response => { this.salServ.list = response["hydra:member"];
    }
    );
  }

  onDeleteSalle(id : number): void{
    if (window.confirm('Are sure you want to delete this Catégorie ?')){
      this.salServ.deleteSalle(id).subscribe(
        (response) => {
          console.log(response);
          this.getSalles();
        },
        (error:any) => console.log(error), 
        () => console.log('department deleted!')
      );
    }
    
  }

  onCreateClicked() : void{
    this.salleForm.setValue({
      libelle: '',
      capacite: '',
      etat: false
    });
    
  }

  onCreateSalle(department: Salle): void{
    document.getElementById("close-model-btn")?.click();
    this.salServ.createSalle(department).subscribe(
      (response) => {
        console.log(response);
        this.getSalles();
      },
      (error:any) => console.log(error), 
      () => console.log('department created!')
    );
  }


  onUpdateClicked(id : number) : void{
    this.salle = this.salServ.list.find((d) => {return d.id === id})!;
    this.updateForm.setValue({
      libelle: this.salle.libelle,
      capacite: this.salle.capacite,
      etat: this.salle.etat,
    });
  }

  onUpdateSalle(): void{
    document.getElementById("close-model-btn1")?.click();
    this.salle.libelle = this.updateForm.value.libelle;
    this.salServ.updateSalle(this.salle).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('department updated!')
    );
  }

}
