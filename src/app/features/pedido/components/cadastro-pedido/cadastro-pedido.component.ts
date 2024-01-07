import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarrinhoService } from 'src/app/shared/carrinho/carrinho.service';
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
    this.itens = this.buscarItensDoCarrinho();
    this.autenthicationService.obterUsuarioLogado().subscribe((usuario) => {
       this.id = usuario.id || 0;
    })
  }

  criarPedido(payload: PedidoSalvar) {
    this.pedidoService.criarPedido(payload).pipe(
    ).subscribe((resposta) => {
      this.snackBarService.open('Pedido realizado com sucesso!');
    });
  }

  salvarPedido() {
    const itensFormatados = this.itens.map(item => ({
      produto: item.produto.id || 0,
      quantidade: item.quantidade,
    }));
      const payload: PedidoSalvar = {
        itens: itensFormatados,
        usuario: this.id,
        parcelas: parseInt(this.formPedido.controls['parcelas'].value),
        formaDePagamento: this.formPedido.controls['pagamento'].value,
      };
    
      const estaCriado = this.criarPedido(payload);

      if(this.formPedido.valid) {
        this.carrinhoService.resetarCarrinho()
      }
      
      this.router.navigate(['pedido/detalhes'])
      
    }

  buscarItensDoCarrinho() {
    return this.carrinhoService.obterItensCarrinho();
  }

  criarFormulario() {
    this.formPedido = this.formBuilder.group({
      pagamento: ['', Validators.required],
      parcelas: ['', Validators.required],
    });
  }
}
