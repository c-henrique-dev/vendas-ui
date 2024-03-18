import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from 'src/app/features/carrinho/carrinho.service';
import { AuthenticationService } from 'src/app/common/auth/service/authentication.service';
import { Pedido } from '../../model/pedido.model';
import { PedidoService } from '../../service/pedido.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { PedidoSalvar } from '../../model/pedido-salvar.model';
import { Router } from '@angular/router';
import { Item } from '../../../item/model/item.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.scss'],
})
export class FinalizarPedidoComponent implements OnInit {
  formPedido!: FormGroup;
  itens!: Item[];
  pedido!: Pedido;
  id!: number;
  estaVazio = true;
  total!: number;

  constructor(
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private snackBarService: SnackBarService,
    private autenthicationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();

    this.obterItensCarrinho();

    this.obterCarrinhoAtualizado();

    this.autenthicationService.obterUsuarioLogado().subscribe((usuario) => {
      this.id = usuario.id || 0;
    });
  }

  criarPedido(payload: PedidoSalvar) {
    this.pedidoService
      .criarPedido(payload)
      .pipe()
      .subscribe((resposta) => {
        this.snackBarService.open('Pedido realizado com sucesso!');
      });
  }

  criarFormulario() {
    this.formPedido = this.formBuilder.group({
      pagamento: ['', Validators.required],
      parcelas: ['', Validators.required],
    });
  }

  salvarPedido() {
    const itensFormatados = this.itens.map((item) => ({
      produto: item.produto.id || 0,
      quantidade: item.quantidade,
    }));

    const payload: PedidoSalvar = {
      itens: itensFormatados,
      usuario: this.id,
      parcelas: parseInt(this.formPedido.controls['parcelas'].value),
      formaDePagamento: this.formPedido.controls['pagamento'].value,
    };

    this.criarPedido(payload);

    if (this.formPedido.valid) {
      this.carrinhoService.resetarCarrinho().subscribe((resposta) => {
        this.carrinhoService.obterItensCarrinho().subscribe((itens) => {
          this.itens = itens;
        });
      });
    }

    this.router.navigate(['pedido/detalhes']);
  }

  excluirItemDoCarrinho(id: number | undefined) {
    if (id != undefined) {
      this.carrinhoService.removerItemDoCarrinho(id).subscribe((resposta) => {
        this.carrinhoService.obterItensCarrinho().subscribe((itens) => {
          this.itens = itens;
          this.total = itens.reduce(
            (acumulador, item) =>
              acumulador + item.produto.precoUnitario * item.quantidade,
            0
          );
        });
      });
    }
  }

  obterItensCarrinho() {
    this.carrinhoService.obterItensCarrinho().subscribe((itens) => {
      this.itens = itens;
      this.estaVazio = this.itens.length === 0;
      this.total = itens.reduce(
        (acumulador, item) =>
          acumulador + item.produto.precoUnitario * item.quantidade,
        0
      );
    });
  }

  obterCarrinhoAtualizado() {
    this.carrinhoService.getCarrinhoAtualizado().subscribe((quantidade) => {
      this.estaVazio = quantidade === 0;
    });
  }
}
