import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DepartmentComponent } from './components/admin/department/department.component';
import { HomeComponent } from './components/home/home.component';
import { MaterielComponent } from './components/admin/materiel/materiel.component';
import { ReclamationComponent } from './components/home/reclamation/reclamation.component';
import { ReservationComponent } from './components/home/reservation/reservation.component';
import { SalleComponent } from './components/admin/salle/salle.component';
import { UsersComponent } from './components/admin/users/users.component';
import { AuthGuard } from './security/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoleGuardGuard } from './security/role-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_USER', 'ROLE_ADMIN']},children: [
    { path: 'reservation', component: ReservationComponent},
    { path: 'reclamation', component: ReclamationComponent},
  ] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, RoleGuardGuard], children: [
    { path: 'department', component: DepartmentComponent}, 
    { path: 'user', component: UsersComponent},
    { path: 'materiel', component: MaterielComponent},
    { path: 'salle', component: SalleComponent},
    { path: 'reclamtion', component: ReclamationComponent},
    { path: 'reservation', component: ReservationComponent},
  ] },
  { path: '', redirectTo: '/login', pathMatch : 'full'},
  { path: '**', component: PageNotFoundComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
