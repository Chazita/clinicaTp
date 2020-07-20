import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService } from './components/auth/service/auth.service';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MenuClienteComponent } from './components/cliente/menu-cliente/menu-cliente.component';
import { TurnoClienteComponent } from './components/cliente/turno-cliente/turno-cliente.component';
import { MisTurnosComponent } from './components/cliente/mis-turnos/mis-turnos.component';
import { MenuEspecialistaComponent } from './components/especialista/menu-especialista/menu-especialista.component';
import { MisTurnosEspecComponent } from './components/especialista/mis-turnos/mis-turnos.component';
import { MenuRecepcionistaComponent } from './components/recepcionista/menu-recepcionista/menu-recepcionista.component';
import { PedirTurnoRecepComponent } from './components/recepcionista/pedir-turno-recep/pedir-turno-recep.component';
import { TurnosRecepComponent } from './components/recepcionista/turnos-recep/turnos-recep.component';
import { ReseniaComponent } from './components/resenia/resenia.component';
import { ReseniaDialogComponent } from './components/resenia-dialog/resenia-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    MenuClienteComponent,
    TurnoClienteComponent,
    MisTurnosComponent,
    MenuEspecialistaComponent,
    MisTurnosEspecComponent,
    MenuRecepcionistaComponent,
    PedirTurnoRecepComponent,
    TurnosRecepComponent,
    ReseniaComponent,
    ReseniaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule,
    FlexLayoutModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
