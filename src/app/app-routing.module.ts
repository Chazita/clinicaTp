import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './components/auth/auth.guard';

import { MenuClienteComponent } from './components/cliente/menu-cliente/menu-cliente.component';
import { TurnoClienteComponent } from './components/cliente/turno-cliente/turno-cliente.component';
import { ClienteGuard } from './components/cliente/cliente.guard';
import { MisTurnosComponent } from './components/cliente/mis-turnos/mis-turnos.component';

import { MenuEspecialistaComponent } from './components/especialista/menu-especialista/menu-especialista.component';
import { MisTurnosEspecComponent } from './components/especialista/mis-turnos/mis-turnos.component';
import { EspecialistaGuard } from './components/especialista/especialista.guard';
import { MenuRecepcionistaComponent } from './components/recepcionista/menu-recepcionista/menu-recepcionista.component';
import { RecepcionistaGuard } from './components/recepcionista/recepcionista.guard';
import { PedirTurnoRecepComponent } from './components/recepcionista/pedir-turno-recep/pedir-turno-recep.component';
import { TurnosRecepComponent } from './components/recepcionista/turnos-recep/turnos-recep.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'cliente',
    component: MenuClienteComponent,
    canActivate: [ClienteGuard],
    children: [
      { path: 'pedir-turno', component: TurnoClienteComponent },
      { path: 'mis-turno', component: MisTurnosComponent },
    ],
  },
  {
    path: 'especialista',
    component: MenuEspecialistaComponent,
    canActivate: [EspecialistaGuard],
    children: [{ path: 'mis-turnos', component: MisTurnosEspecComponent }],
  },
  {
    path: 'recepcionista',
    component: MenuRecepcionistaComponent,
    canActivate: [RecepcionistaGuard],
    children: [
      { path: 'pedir-turno', component: PedirTurnoRecepComponent },
      { path: 'all-turnos', component: TurnosRecepComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
