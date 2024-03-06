import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from 'src/app/features/carrinho/carrinho.service';
import { Item } from '../../model/item.model';
import { AuthenticationService } from 'src/app/common/auth/service/authentication.service';
import { Pedido } from '../../model/pedido.model';
import { PedidoService } from '../../service/pedido.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { PedidoSalvar } from '../../model/pedido-salvar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.scss'],
})
export class CadastroPedidoComponent implements OnInit {
  formPedido!: FormGroup;
  itens!: Item[];
  pedido!: Pedido;
  id!: number;
  estaVazio = true;

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

    this.carrinhoService.obterItensCarrinho().subscribe((itens) => {
      this.itens = itens;
      this.estaVazio = this.itens.length === 0;
    });

    this.carrinhoService.getCarrinhoAtualizado().subscribe((quantidade) => {
      this.estaVazio = quantidade === 0;
    });

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
        });
      });
    }
  }

  criarFormulario() {
    this.formPedido = this.formBuilder.group({
      pagamento: ['', Validators.required],
      parcelas: ['', Validators.required],
    });
  }
}
