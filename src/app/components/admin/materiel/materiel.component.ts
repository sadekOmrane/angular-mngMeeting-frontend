import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Materiel } from 'src/app/entity/materiel';
import { Salle } from 'src/app/entity/salle';
import { MaterielService } from 'src/app/service/materiel.service';
import { SalleService } from 'src/app/service/salle.service';

@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {
  
  materiel !: Materiel;
  salles !: Salle[];
  constructor( public matServ:MaterielService, public salServ:SalleService, public router : Router) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('materielForm') materielForm !: NgForm;

  ngOnInit(): void {
    this.getMateriels();
    this.salServ.getSalles().subscribe(
      response => { this.salles = response["hydra:member"]; }
    );
  }

  private getMateriels():void{
    this.matServ.getMateriels().subscribe( 
      response => { this.matServ.list = response["hydra:member"];
    }
    );
  }

  onDeleteMateriel(id : number): void{
    if (window.confirm('Are sure you want to delete this Materiel ?')){
      this.matServ.deleteMateriel(id).subscribe(
        (response) => {
          console.log(response);
          this.getMateriels();
        },
        (error:any) => console.log(error), 
        () => console.log('materiel deleted!')
      );
    }
    
  }

  onCreateClicked() : void{
    this.materielForm.setValue({
      libelle: '',
      salle: '',
    });
  }

  onCreateMateriel(materiel: Materiel): void{
    document.getElementById("close-model-btn")?.click();
    this.matServ.createMateriel(materiel).subscribe(
      (response) => {
        console.log(response);
        this.getMateriels();
      },
      (error:any) => console.log(error), 
      () => console.log('materiel created!')
    );
    this.getMateriels();
  }


  onUpdateClicked(id : number) : void{
    this.materiel = this.matServ.list.find((d) => {return d.id === id})!;
    this.updateForm.setValue({
      libelle: this.materiel.libelle,
      salle: this.materiel.salle
    });
  }

  onUpdateMateriel(): void{
    document.getElementById("close-model-btn1")?.click();
    this.materiel.libelle = this.updateForm.value.libelle;
    this.matServ.updateMateriel(this.materiel).subscribe(
      (response) => console.log(response),
      (error:any) => console.log(error), 
      () => console.log('materiel updated!')
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
