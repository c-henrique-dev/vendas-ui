import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../models/produto.model';
import { DialogService } from 'src/app/shared/dialog/service/dialog.service';
import { ConfirmacaoDialogComponent } from 'src/app/features/produto/components/confirmacao-dialog/confirmacao-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem-produto.component.html',
  styleUrls: ['./listagem-produto.component.scss'],
})
export class ListagemProdutoComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private readonly produtoService: ProdutoService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarProdutos();
  }

  adicionarImagem(id: number | undefined, event: any): void {
    if (id !== undefined) {
      const selectedFile: File = event.target.files[0];

      this.produtoService.adicionarImagem(id, selectedFile).subscribe((res) => {
        window.location.reload();
      });
    }
  }

  chamarEdicao(produto: Produto) {
    if (produto.id != undefined) {
      this.router.navigate(['produto', 'editar', produto.id]);
    }
  }

  excluirProduto(id: number | undefined) {
    if (id != undefined) {
      this.dialogService.openDialog(id, ConfirmacaoDialogComponent);
    }
  }

  buscarProdutos() {
    this.produtoService.getProdutos().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
    });
  }

  navegarParaDetalhes(produtoId: number | undefined): void {
    if (produtoId !== undefined) {
      this.router.navigate(['/produto', produtoId]);
    }
  }
}
