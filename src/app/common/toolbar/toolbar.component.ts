import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/service/authentication.service';
import { CarrinhoService } from 'src/app/features/carrinho/carrinho.service';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  estaLogado: boolean = false;
  tamanho: number = 0;
  inputValue: string = '';

  constructor(
    private authService: AuthenticationService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });

    this.carrinhoService.obterItensCarrinho().subscribe((itens) => {
      this.tamanho = itens.length;
    });

    this.carrinhoService.getCarrinhoAtualizado().subscribe((tamanho) => {
      this.tamanho = tamanho;
    });
  }

  pesquisar() {
    this.router.navigate(['produto'], { queryParams: { nome: this.inputValue } });
  }

  sair() {
    this.authService.sair();
    this.router.navigate(['auth', 'login']);
  }
}
