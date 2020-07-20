import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Turno } from 'src/app/class/Turno';
import { Subscription } from 'rxjs';
import { User } from 'src/app/class/User';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosEspecComponent implements OnInit, OnDestroy {
  displayColumn: string[] = ['fecha', 'hora', 'nombre', 'apellido', 'accion'];
  dataUser: User;
  turnosNoAtendidos: Turno[];
  turnosAtendidos: Turno[];
  subcription: Subscription[] = new Array<Subscription>();

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('data'));

    this.subcription.push(
      this.dbService
        .traerTurnosEspecialista(this.dataUser.uid)
        .subscribe((value) => (this.turnosAtendidos = value))
    );

    this.subcription.push(
      this.dbService
        .traerTurnosEspecialistaAtendidos(this.dataUser.uid)
        .subscribe((value) => (this.turnosNoAtendidos = value))
    );
  }

  ngOnDestroy(): void {
    this.subcription.forEach((value) => {
      value.unsubscribe();
    });
  }

  marcarAtendido(turno: Turno) {
    this.dbService.actualizarTurnoAtendido(turno);
  }
}
