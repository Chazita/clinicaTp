import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DatabaseService } from 'src/app/components/services/database.service';
import { User } from 'src/app/class/User';
import { MyErrorStateMatcher } from 'src/app/class/MyErrorStateMatcher.class';
import { FormControl, Validators } from '@angular/forms';
import { Turno } from 'src/app/class/Turno';

@Component({
  selector: 'app-turno-cliente',
  templateUrl: './turno-cliente.component.html',
  styleUrls: ['./turno-cliente.component.scss'],
})
export class TurnoClienteComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  minDate: Date;
  time: string;
  fecha: string;
  especialistas: User[];
  turno: Turno = new Turno();

  dataUser: User;
  selected = new FormControl('', [Validators.required]);

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
      this.selected.value !== ''
    ) {
      this.turno.clienteId = this.dataUser.uid;
      this.turno.clienteLastName = this.dataUser.lastName;
      this.turno.clienteName = this.dataUser.name;
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
