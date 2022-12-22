import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/entity/reservation';
import { Salle } from 'src/app/entity/salle';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { SalleService } from 'src/app/service/salle.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { Notification } from 'src/app/entity/notification';
import { ReadedNotification } from 'src/app/entity/readednotification';
import { ReadedNotificationService } from 'src/app/service/readnotif.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservation !: Reservation;
  salles : Salle[] = [];
  reservations !: Reservation[];
  user !: User;
  users !: User[];
  showSalles = false;
  addFormValidator = false;
  
  constructor( public resServ:ReservationService, public salServ:SalleService, private rnotifServ : ReadedNotificationService,private notifServ: NotificationService,public authServ:AuthService, public router : Router, private userServ : UserService, private tokenServ : TokenService) { }

  @ViewChild('updateForm') updateForm !: NgForm;
  @ViewChild('reservationForm') reclamationForm !: NgForm;

  ngOnInit(): void {
    setTimeout(() => {
      this.getReservations();
    }, 300);
    this.salServ.getSalles().subscribe(
      response => { this.salServ.list = response["hydra:member"];
    }
    );
    this.userServ.getUsers().subscribe(
      response => { this.users = response["hydra:member"]; }
    );
    
  }


  private getReservations():void{
    const templist : Reservation[] = [];
    const usr : User = this.tokenServ.getUser();
    this.resServ.getReservations().pipe(map(res =>{
      for(const item of res["hydra:member"]){
        if(item["responsable"] == "/api/users/"+usr.id || item["users"].indexOf('/api/users/'+usr.id) > -1 || usr.roles.indexOf('ROLE_ADMIN') > -1){
          templist.push(item);
        }
      }
      this.resServ.list = templist;
    })).subscribe();
  }

 

  onDeleteReservation(id : number): void{
    if (window.confirm('Are sure you want to delete this Reclamation ?')){
      this.resServ.deleteReservation(id).subscribe(
        (response) => {
          console.log(response);
          this.getReservations();
        },
        (error:any) => console.log(error), 
        () => console.log('Reclamation deleted!')
      );
    }
    
  }

  async onRechercheClicked(inputId : string){
    let dateDeb = new Date((<HTMLInputElement>document.getElementById("dateDeb"+inputId)).value); 
    let dateFin = new Date((<HTMLInputElement>document.getElementById("dateFin"+inputId)).value); 
    let capacite = (<HTMLInputElement>document.getElementById("capacite"+inputId)).value; 
    let tempList : Salle[] = [];
    let finalList : Salle[] = [];
    if(dateDeb.toString() != "Invalid Date" && dateFin.toString() != "Invalid Date" && capacite != ""){
      // get data
          for(let salle of this.salServ.list){
            if(salle.capacite >= +capacite){ 
              tempList.push(salle);
            }
          }
          // date filter
          for(let salle of tempList){
            if(salle.reservations.length > 0){
            for(let reserv of salle.reservations){
              this.resServ.getReservation(+reserv.substring(18)).subscribe(
                (res)=>{
                  let resDateDeb = new Date(res.dateDeb);
                  let resDateFin = new Date(res.dateFin);
                  if(!(((dateDeb >= resDateDeb) && (dateDeb <= resDateFin)) || ((dateFin >= resDateDeb) && (dateFin <= resDateFin)) || ((dateDeb <= resDateDeb) && (dateFin >= resDateFin) ))){
                    console.log("true");
                    finalList.push(salle);
                  }  
                }
              );
            }
            }
            else
              finalList.push(salle);    
          }
          setTimeout(()=>{
            this.salles = finalList;
            // sorting
            this.salles.sort((a:Salle, b: Salle) =>{
            if(a.capacite>b.capacite) return 1;
            if(a.capacite<b.capacite) return -1;
            return 0;
          });
            //show data
            this.showSalles = true;
          },300)
      }
      else{
        this.addFormValidator = true;
        await setTimeout(()=>{
          this.addFormValidator = false;
        }, 5000);
      }
    }


  onCreateClicked() : void{
    this.reclamationForm.setValue({
      dateDeb : '',
      dateFin : '',
    });
  }

  onCreateReservation(reservation: Reservation): void{
    document.getElementById("close-model-btn")?.click();
    let salleId = (<HTMLInputElement>document.querySelector("input[name='reserv']:checked")).value;
    reservation.salle = "/api/salles/"+salleId;
    this.user = this.tokenServ.getUser();
    reservation.responsable = "/api/users/"+this.user.id;
    this.resServ.createReservation(reservation).subscribe(
      (res) => {
        let notification : Notification = {
          message: "vous avez une nouvelle reunion",
          createAt: new Date(),
          users : reservation.users,
          reunion: "/api/reservations/"+res['id']
        };
        this.notifServ.createNotification(notification).subscribe(
          (response)=>{
            let temp = response["users"];
            for(let not of temp){
              let rNotif : ReadedNotification = {
                user : not || '',
                notification : "/api/notifications/"+response["id"] || '',
                state : false,
                readAt : new Date()
              }
              this.rnotifServ.createReadedNotification(rNotif).subscribe();
            }
          },
          (error:any)=> console.log(error)
        );
      },
      (error:any) => console.log(error), 
      () => console.log('Reservation created!')
    );
    this.getReservations();
  }


  onUpdateClicked(id : number) : void{
    this.reservation = this.resServ.list.find((d) => {return d.id === id})!;
    console.log(this.reservation);
    let deb = new Date(this.reservation.dateDeb);
    let fin = new Date(this.reservation.dateFin);
    deb.setHours(deb.getHours()+1);
    fin.setHours(fin.getHours()+1);
    this.updateForm.setValue({
      dateDeb: deb.toISOString().slice(0, 16),
      dateFin: fin.toISOString().slice(0, 16),
      capacite: "",

    });
  }

  onUpdateReservation(): void{
    document.getElementById("close-model-btn1")?.click();
    this.reservation.salle = this.updateForm.value.salle;
    this.reservation.dateDeb = this.updateForm.value.dateDeb;
    this.reservation.dateFin = this.updateForm.value.dateFin;
    this.reservation.responsable = this.updateForm.value.responsable;

    this.resServ.updateReservation(this.reservation).subscribe(
      (res) => {
        let notification : Notification = {
          message: "vous avez une reunion modifier",
          createAt: new Date(),
          users : this.updateForm.value.users,
          reunion: "/api/reservations/"+res['id']
        };
        this.notifServ.createNotification(notification).subscribe(
          (response)=>{
            console.log("notif!!");
            let temp = response["users"];
            for(let not of temp){
              let rNotif : ReadedNotification = {
                user : not || '',
                notification : "/api/notifications/"+response["id"] || '',
                state : false,
                readAt : new Date()
              }
              this.rnotifServ.createReadedNotification(rNotif).subscribe();
            }
          },
          (error:any)=> console.log(error)
        );
      },
      (error:any) => console.log(error), 
      () => console.log('Reservation updated!')
    );
    this.getReservations();
  }

  getSalleName(str: string):String{
    for (let i = 0; i < this.salServ.list?.length; i++) { 
      if("/api/salles/"+this.salServ.list[i].id==str)
        return this.salServ.list[i].libelle;
    }
    return '';
  }
  getRespEmail(str: string) : String{   
    for (let i = 0; i < this.users?.length; i++) { 
      if("/api/users/"+this.users[i].id==str)
        return this.users[i].email;
    }
    return '';
  }
}









