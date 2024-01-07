import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProdutoService } from '../../service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss']
})
export class ConfirmacaoDialogComponent {

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private produtoService: ProdutoService,
  ){}

  excluirProduto() {
    this.produtoService.excluirProduto(this.data.code).subscribe(resposta => {
      window.location.reload();
    });
  }
}
