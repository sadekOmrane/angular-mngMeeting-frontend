import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/entity/department';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/service/auth.service';
import { DepartmentService } from 'src/app/service/department.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { map } from 'rxjs';
import { Notification } from 'src/app/entity/notification';
import { ReadedNotification } from 'src/app/entity/readednotification';
import { ReadedNotificationService } from 'src/app/service/readnotif.service';
import { ReservationService } from 'src/app/service/reservation.service';
import { Reservation } from 'src/app/entity/reservation';
import { NotifInfo } from 'src/app/entity/notifInfo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user : User = new User();
  isAdmin = false;
  notifications !: NotifInfo[];
  notifCounter : number = 0;
  dateNow = new Date();
  months = {
    1 : 'Janvier',
    2 : 'Fivrier',
    3 : 'Mars',
    4 : 'Avril',
    5 : 'Mai',
    6 : 'Juin',
    7 : 'Joillet',
    8 : 'Aout',
    9 : 'Septembre',
    10 : 'Octobre',
    11 : 'Novombre',
    12 : 'Decembre',
  }
  constructor(private resServ : ReservationService ,private userServ: UserService, private rnotifServ : ReadedNotificationService,public tokenServ: TokenService ,private router: Router, public authServ : AuthService, public notifServ : NotificationService) { }


  ngOnInit(): void {
    setTimeout(()=>{
       this.user = this.tokenServ.getUser();
      if(this.user.roles.indexOf('ROLE_ADMIN') > -1)
        this.isAdmin = true;
      this.activeDay();
      this.notifications = this.getNotifications(); 
    }, 500);
  }


  notifDisplayed(){
    if(this.notifCounter > 0){
      this.userServ.getUser(this.user.id).subscribe((usr)=>{
        for(let rntf of usr.readedNotifications){
          this.rnotifServ.getReadedNotification(+rntf.substring(26)).subscribe(
            (res)=>{
              if(res.state == false){
                res.state = true;
                this.rnotifServ.updateReadedNotification(res).subscribe();
                this.notifCounter = 0;
              }
          });
        }
      });
    }
  }

  activeDay(){
    let date = this.dateNow.toDateString().split(" ");
    let dayInput = (<HTMLInputElement>document.getElementById(date[2])); 
    dayInput.innerHTML = "<span style='padding: 5px;background: #0d6efd;border-radius: 50%;padding: 7px;color: white !important'>"+date[2]+"</span>";
  }

  getNotifications(){
    let temp : NotifInfo[] = [];
    this.userServ.getUser(this.user.id).subscribe((usr)=>{
      for(let ntf of usr.notifications){
        temp.push(this.getNotifInfo(ntf));
      }
    });
    return temp;
  }

  getNotifInfo(notf : string){
    let notifInfo : NotifInfo = new NotifInfo();
    this.notifServ.getNotification(+notf.substring(19)).subscribe(
      (notf) => {
        this.resServ.getReservation(+notf.reunion?.substring(18)).subscribe(
          (rn) => {
            this.userServ.getUser(+rn.responsable?.substring(11)).subscribe(
              (res) => {
                notifInfo.responsableEmail = res.email; 
                for(let rntf of this.user.readedNotifications){
                  this.rnotifServ.getReadedNotification(+rntf.substring(26)).subscribe((res)=>{ 
                    if(res.notification == "/api/notifications/"+notf.id){
                      notifInfo.isReaded = res.state;
                      if(res.state == false){
                        this.notifCounter+=1;
                      }
                    }
                  }, (error) => console.log(error))
                }
              },
                (error:any) => console.log(error)
            );
            notifInfo.reunionDate = rn.dateDeb;
          },
            (error:any) => console.log(error)
        );
        notifInfo.message = notf.message;
      },
        (error:any) => console.log(error)
    );    
    return notifInfo;
  }


  onLogout(){
    this.tokenServ.removeToken();
    this.router.navigate(['/login']);
  }

}
