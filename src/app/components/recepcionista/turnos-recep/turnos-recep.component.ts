import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/class/Turno';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-turnos-recep',
  templateUrl: './turnos-recep.component.html',
  styleUrls: ['./turnos-recep.component.scss'],
})
export class TurnosRecepComponent implements OnInit {
  displayColumn: string[] = [
    'fecha',
    'hora',
    'nombre',
    'apellido',
    'especialista',
    'accion',
  ];

  turnos: Turno[] = new Array<Turno>();

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService.traerTurnos().subscribe((value) => (this.turnos = value));
  }

  eliminarTurno(uid: string) {
    this.dbService.eliminar(uid);
  }
}
