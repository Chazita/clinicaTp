import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReseniaDialogComponent } from '../resenia-dialog/resenia-dialog.component';
import { DatabaseService } from '../services/database.service';
import { Resenia } from 'src/app/class/Resenia';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.scss'],
})
export class ReseniaComponent implements OnInit {
  @Input() id: string;
  @Input() role: string;
  reseniaData: Resenia;

  constructor(public dialog: MatDialog, public dbService: DatabaseService) {}

  ngOnInit(): void {
    this.dbService
      .getResenia(this.id)
      .subscribe((value) => (this.reseniaData = value));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReseniaDialogComponent, {
      width: '500px',
      data: { resenia: this.reseniaData, role: this.role },
    });

    if (this.role === 'cliente') {
      dialogRef.afterClosed().subscribe((result) => {
        if (result.resenia !== undefined) {
          this.dbService.escribirReseniaCliente(
            result.resenia.textoCliente,
            result.resenia.puntuacionClinica,
            result.resenia.puntuacionEspecialista,
            result.resenia.uid
          );
        }
      });
    } else {
      dialogRef.afterClosed().subscribe((result) => {
        if (result.resenia !== undefined) {
          this.dbService.escribirReseniaEspecialista(
            result.resenia.textoEspecialista,
            result.resenia.uid
          );
        }
      });
    }
  }
}
