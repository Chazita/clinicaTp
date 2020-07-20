import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { User } from 'src/app/class/User';
import { Subscription } from 'rxjs';
import { Turno } from 'src/app/class/Turno';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit, OnDestroy {
  displayColumn: string[] = ['fecha', 'hora', 'especialista', 'accion'];
  userData: User;
  misTurnos: Turno[];
  subcription: Subscription;

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('data'));

    this.subcription = this.dbService
      .traerTurnosCliente(this.userData.uid)
      .subscribe((value) => {
        this.misTurnos = value;
      });
  }

  eliminarTurno(uid: string) {
    this.dbService.eliminar(uid);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
