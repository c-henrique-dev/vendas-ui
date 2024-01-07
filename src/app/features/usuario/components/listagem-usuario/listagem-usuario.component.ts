import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario.interface';
import { UsuarioService } from '../../service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem-usuario.component.html',
  styleUrls: ['./listagem-usuario.component.scss']
})
export class ListagemUsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(
    private readonly usuarioService: UsuarioService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.usuarioService.getUsuarios().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  }

  chamarEdicao(usuario: Usuario) {
    if(usuario.id != undefined) {
    this.router.navigate(['usuario', 'editar', usuario.id]);
    }
  }

}
