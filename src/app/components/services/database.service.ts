import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import { User } from 'src/app/class/User';
import { Turno } from 'src/app/class/Turno';
import { Observable } from 'rxjs';
import { Resenia } from 'src/app/class/Resenia';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private especialistaColection: AngularFirestoreCollection<User>;

  constructor(private afStore: AngularFirestore) {
    this.especialistaColection = this.afStore.collection<User>('users', (ref) =>
      ref.where('role', '==', 'especialista')
    );
  }

  traerTurnosCliente(uid: string): Observable<Turno[]> {
    return this.afStore
      .collection<Turno>('turnos', (ref) => ref.where('clienteId', '==', uid))
      .valueChanges();
  }

  public traerEspecialistas(): Observable<User[]> {
    return this.especialistaColection.valueChanges();
  }

  traerTurnos(): Observable<Turno[]> {
    return this.afStore
      .collection<Turno>('turnos', (ref) => ref.where('atendido', '==', false))
      .valueChanges();
  }

  public traerTurnosEspecialista(uid: string): Observable<Turno[]> {
    const todayDate: Date = new Date();
    return this.afStore
      .collection<Turno>('turnos', (ref) =>
        ref
          .where('especialistaId', '==', uid)
          .where('atendido', '==', false)
          .where('fecha', '==', todayDate.toDateString())
      )
      .valueChanges();
  }

  public traerTurnosEspecialistaAtendidos(uid: string): Observable<Turno[]> {
    return this.afStore
      .collection<Turno>('turnos', (ref) =>
        ref.where('especialistaId', '==', uid).where('atendido', '==', true)
      )
      .valueChanges();
  }

  public addTurno(turno: Turno): void {
    try {
      const id = this.afStore.createId();
      turno.uid = id;
      this.afStore
        .collection<Turno>('turnos')
        .doc(id)
        .set(turno.toPlainObject());
      window.alert('Turno registrado');
    } catch (err) {
      console.log(err);
    }
  }

  public eliminar(uid: string): void {
    try {
      this.afStore.doc(`turnos/${uid}`).delete();
      window.alert('Turno cancelado');
    } catch (err) {
      console.log(err);
    }
  }

  public actualizarTurnoAtendido(turno: Turno) {
    const turnoRef = this.afStore.doc<Turno>(`turnos/${turno.uid}`);
    const turnoPartial: Partial<Turno> = {
      atendido: true,
    };
    turnoRef.update(turnoPartial);
    this.crearReseniaVacia(turno);
  }

  private crearReseniaVacia(turno: Turno) {
    const reseniaRef = this.afStore.doc<Resenia>(`resenia/${turno.uid}`);
    const resenia: Resenia = {
      uid: turno.uid,
      clienteId: turno.clienteId,
      textoCliente: '',
      puntuacionClinica: 0,
      puntuacionEspecialista: 0,
      especialistaId: turno.especialistaId,
      textoEspecialista: '',
      fecha: turno.fecha,
    };

    return reseniaRef.set(resenia);
  }

  public escribirReseniaEspecialista(texto: string, reseniaId: string) {
    const reseniaRef = this.afStore.doc<Resenia>(`resenia/${reseniaId}`);
    const partialResenia: Partial<Resenia> = {
      textoEspecialista: texto,
    };
    reseniaRef.update(partialResenia);
  }

  public escribirReseniaCliente(
    texto: string,
    puntuacionClinica: number,
    puntuacionEspecialista: number,
    reseniaId: string
  ) {
    const reseniaRef = this.afStore.doc<Resenia>(`resenia/${reseniaId}`);
    const partialResenia: Partial<Resenia> = {
      textoCliente: texto,
      puntuacionClinica,
      puntuacionEspecialista,
    };

    reseniaRef.update(partialResenia);
  }

  public getResenia(reseniaId: string) {
    return this.afStore.doc<Resenia>(`resenia/${reseniaId}`).valueChanges();
  }
}
