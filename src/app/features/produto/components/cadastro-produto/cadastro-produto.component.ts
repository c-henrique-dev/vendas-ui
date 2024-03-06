import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../models/produto.model';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent implements OnInit {
  formProduto!: FormGroup;
  rota: string = '';
  estaCriando: boolean = false;
  id: string = '';
  produto!: Produto;

  constructor(
    private produtoService: ProdutoService,
    private snackBarService: SnackBarService,
    private formBuilder: FormBuilder,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.rota = this.activatedRouter.snapshot.url[0].path;

    if (this.rota === 'editar') {
      this.id = this.activatedRouter.snapshot.url[1].path;
      this.buscarProdutoPeloId();
    } else {
      this.estaCriando = true;
    }
  }

  criarFormulario() {
    this.formProduto = this.formBuilder.group({
      nomeProduto: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
    });
  }

  limparFormulario() {
    this.formProduto.reset();
  }

  buscarProdutoPeloId() {
    this.produtoService
      .getProdutoPeloId(+this.id)
      .subscribe((produto: Produto) => {
        this.produto = produto;
        this.formProduto.controls['descricao'].setValue(this.produto.descricao),
          this.formProduto.controls['nomeProduto'].setValue(
            this.produto.nomeProduto
          ),
          this.formProduto.controls['preco'].setValue(
            this.produto.precoUnitario
          ),
          this.formProduto.controls['estoque'].setValue(
            this.produto.estoque.quantidadeDisponivel
          );
      });
  }

  criarProduto(payload: Produto) {
    this.produtoService
      .criarProduto(payload)
      .pipe(
        catchError((error) => {
          this.snackBarService.open(error.error.errors[0]);
          return [];
        })
      )
      .subscribe((resposta) => {
        this.limparFormulario();
        this.snackBarService.open('Produto cadastrado com sucesso!');
      });
  }

  editarProduto(payload: Produto) {
    this.produtoService.alterarProduto(payload).subscribe((resposta) => {
      this.snackBarService.open('Produto alterado com sucesso!');
      setTimeout(() => {
        this.router.navigate(['produto']);
      }, 1000);
    });
  }

  salvarProduto() {
    if (this.formProduto.touched && this.formProduto.dirty) {
      const payload: Produto = {
        nomeProduto: this.formProduto.controls['nomeProduto'].value,
        descricao: this.formProduto.controls['descricao'].value,
        precoUnitario: this.formProduto.controls['preco'].value,
        estoque: {
          quantidadeDisponivel: parseInt(
            this.formProduto.controls['estoque'].value
          ),
        },
      };

      if (this.estaCriando) {
        this.criarProduto(payload);
      } else {
        payload.id = this.produto.id;
        this.editarProduto(payload);
      }
    }
  }
}
