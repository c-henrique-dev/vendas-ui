import { Component, OnInit} from '@angular/core';
import { ProdutoService } from '../../service/produto.service';
import { Produto } from '../../models/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/features/carrinho/carrinho.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/features/item/model/item.model';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe-produto.component.html',
  styleUrls: ['./detalhe-produto.component.scss'],
})
export class DetalheProdutoComponent implements OnInit{
  produto!: Produto;
  produtoId!: number;
  meuFormulario: FormGroup;

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.meuFormulario = this.formBuilder.group({
      quantidade: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.produtoId = +idParam;
      this.buscarProdutoPeloId();
    }

    this.meuFormulario = this.formBuilder.group({
      quantidade: ['1', Validators.required],
    });

  }

  buscarProdutoPeloId() {
    this.produtoService
      .getProdutoPeloId(this.produtoId)
      .subscribe((produto: Produto) => {
        this.produto = produto;
      });
  }

  adicionarAoCarrinho() {
    const item: Item = {
      produto: this.produto,
      quantidade: this.meuFormulario.controls['quantidade'].value,
    };

    this.carrinhoService.adicionarItemAoCarrinho(item);
  }

  realizarPedido() {
    const item: Item = {
      produto: this.produto,
      quantidade: this.meuFormulario.controls['quantidade'].value,
    };
    this.carrinhoService.adicionarItemAoCarrinho(item);
    this.router.navigate(['pedido/finalizar']);
  }
}
