import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  estaLogado: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.usuarioEstaLogado().subscribe((estaLogado) => {
      this.estaLogado = estaLogado;
    });
  }
}
