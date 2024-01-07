import { Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    ) {}

  openDialog(code: number, component: any, titulo?: string,) {
    const dialogRef = this.dialog.open(component, {
      data: { code: code, titulo },
      height: "100%"
    });
  }
}
