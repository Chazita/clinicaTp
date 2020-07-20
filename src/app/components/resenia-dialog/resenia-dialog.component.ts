import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReseniaComponent } from '../resenia/resenia.component';
import { Resenia } from 'src/app/class/Resenia';

export interface DialogData {
  resenia: Resenia;
  role: string;
}

@Component({
  selector: 'app-resenia-dialog',
  templateUrl: './resenia-dialog.component.html',
  styleUrls: ['./resenia-dialog.component.scss'],
})
export class ReseniaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ReseniaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
