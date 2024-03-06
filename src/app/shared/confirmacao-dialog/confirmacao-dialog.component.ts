import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../features/produto/models/produto.model';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss'],
})
export class ConfirmacaoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Produto
  ) {}
}
