import { Component, OnInit, ViewChild } from '@angular/core';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../models/produto.model';
import { ConfirmacaoDialogComponent } from 'src/app/shared/confirmacao-dialog/confirmacao-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem-produto.component.html',
  styleUrls: ['./listagem-produto.component.scss'],
})
export class ListagemProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  nomeProduto!: string;
  currentPage: number = 0;
  totalProdutos: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly produtoService: ProdutoService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.atualizarProdutos(this.paginator.pageIndex, this.paginator.pageSize);
  }

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.nomeProduto = params['nome'];

      this.atualizarProdutos(this.paginator.pageIndex, this.paginator.pageSize);
    });
  }

  atualizarProdutos(pageIndex: number, pageSize: number) {
    this.produtoService
      .getProdutos(this.nomeProduto, pageIndex, pageSize)
      .subscribe((result) => {
        this.produtos = result.content;
        this.totalProdutos = result.totalElements;
      });
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
    const dialog = this.dialog.open(ConfirmacaoDialogComponent, {
      data: { id: id },
      height: '140px',
    });

    dialog.afterClosed().subscribe((remove) => {
      if (remove && id != undefined) {
        this.produtoService.excluirProduto(id).subscribe(() => {
          this.atualizarProdutos(
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        });
      }
    });
  }

  navegarParaDetalhes(produtoId: number | undefined): void {
    if (produtoId !== undefined) {
      this.router.navigate(['/produto', produtoId]);
    }
  }
}
