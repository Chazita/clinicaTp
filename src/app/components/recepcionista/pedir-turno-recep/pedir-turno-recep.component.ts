import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { MyErrorStateMatcher } from 'src/app/class/MyErrorStateMatcher.class';
import { User } from 'src/app/class/User';
import { Turno } from 'src/app/class/Turno';
import { FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-pedir-turno-recep',
  templateUrl: './pedir-turno-recep.component.html',
  styleUrls: ['./pedir-turno-recep.component.scss'],
})
export class PedirTurnoRecepComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  minDate: Date;
  time: string;
  fecha: string;
  especialistas: User[];
  turno: Turno = new Turno();

  dataUser: User;
  selected = new FormControl('', [Validators.required]);
  nombreFormControl = new FormControl('', [Validators.required]);
  apellidoFormControl = new FormControl('', [Validators.required]);

  constructor(private dbService: DatabaseService) {
    this.minDate = new Date(Date.now());
    this.dataUser = JSON.parse(localStorage.getItem('data'));
  }

  ngOnInit(): void {
    this.dbService.traerEspecialistas().subscribe((value) => {
      this.especialistas = value;
    });
  }

  daysFilter(date: Date | null): boolean {
    const day = (date || new Date()).getDay();
    return day !== 0;
  }

  addFecha($event: MatDatepickerInputEvent<Date>) {
    this.fecha = $event.value.toDateString();
  }

  pedirTurno() {
    if (
      this.fecha !== undefined &&
      this.time !== undefined &&
      this.selected.value !== '' &&
      this.nombreFormControl.value !== '' &&
      this.apellidoFormControl.value !== ''
    ) {
      this.turno.clienteId = this.dataUser.uid;
      this.turno.clienteLastName = this.apellidoFormControl.value;
      this.turno.clienteName = this.nombreFormControl.value;
      this.turno.especialistaId = this.selected.value.uid;
      this.turno.especialistaFullName =
        this.selected.value.name + ' ' + this.selected.value.lastName;
      this.turno.fecha = this.fecha;
      this.turno.hora = this.time;
      this.turno.atendido = false;
      if (
        this.fecha.split(' ')[0] === 'Sat' &&
        this.time >= '08:00' &&
        this.time <= '13:45'
      ) {
        this.dbService.addTurno(this.turno);
      } else if (this.time >= '08:00' && this.time <= '18:45') {
        this.dbService.addTurno(this.turno);
      }
    }
  }
}
