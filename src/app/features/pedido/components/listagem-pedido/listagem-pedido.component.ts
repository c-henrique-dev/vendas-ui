import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { AuthenticationService } from 'src/app/common/auth/service/authentication.service';
import { lastValueFrom } from 'rxjs';
import { Login } from 'src/app/common/auth/models/login.interface';
import { PedidoDetalhes } from '../../model/pedido-detalhes.model';

@Component({
  selector: 'app-listar',
  templateUrl: './listagem-pedido.component.html',
  styleUrls: ['./listagem-pedido.component.scss']
})
export class ListagemPedidoComponent implements OnInit {
  pedidos!: PedidoDetalhes[]
  login!: Login;

  constructor(
    private pedidoService: PedidoService,
    private authenticationService: AuthenticationService
  ) { }

  async ngOnInit(): Promise<void> {
    const login = this.authenticationService.obterUsuarioLogado();
    this.login = await lastValueFrom(login);

    const pedido = this.buscarPedidoPeloLogin();
    this.pedidos = await lastValueFrom(pedido);
  }

  buscarPedidoPeloLogin() {
    return this.pedidoService.getPedidoPeloLogin(this.login.login);
  }

}
