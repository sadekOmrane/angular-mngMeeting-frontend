import { Component } from '@angular/core';
import { User } from './entity/user';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-symfony-project';
  
  constructor(public tokenServ : TokenService){}
  
}
