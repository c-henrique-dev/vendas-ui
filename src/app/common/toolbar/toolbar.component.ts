import { Component, Input, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../auth/service/authentication.service';
import { CarrinhoService } from 'src/app/shared/carrinho/carrinho.service';

@Component({
  selector: 'app-slide-nav',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class SlideNavComponent implements OnInit {
  @Input() menu!: any[];
  estaLogado: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private carrinhoService: CarrinhoService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado()
    .subscribe(estaLogado => {
      this.estaLogado = estaLogado;
    })
  }

  listarItensDoCarrinho() {
    return this.carrinhoService.obterItensCarrinho();
  }

  sair() {
    this.authService.sair();
    this.router.navigate(['auth', 'login']);
  }

}
