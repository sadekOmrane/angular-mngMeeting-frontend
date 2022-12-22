import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentComponent } from './components/admin/department/department.component';
import { FormsModule } from '@angular/forms';
import { MaterielComponent } from './components/admin/materiel/materiel.component';
import { SalleComponent } from './components/admin/salle/salle.component';
import { ReclamationComponent } from './components/home/reclamation/reclamation.component';
import { ReservationComponent } from './components/home/reservation/reservation.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TokenInterceptorProvider } from './helps/token.interceptor';
import { UsersComponent } from './components/admin/users/users.component';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DepartmentComponent,
    MaterielComponent,
    SalleComponent,
    ReclamationComponent,
    ReservationComponent,
    LoginComponent,
    UsersComponent,
    AdminComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [TokenInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
