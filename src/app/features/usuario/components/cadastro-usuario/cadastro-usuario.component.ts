import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  formUsuario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario() {
    this.formUsuario = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required],
      admin: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      rua: ['', Validators.required],
      complemento: ['', Validators.required],
      numero: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      bairro: ['', Validators.required],
    });
  }

  criarUsuario(payload: Usuario) {
    this.usuarioService.criarUsuario(payload).subscribe((resposta) => {
      window.location.reload();
    });
  }

  editarUsuario(payload: Usuario) {
    this.usuarioService.alterarUsuario(payload)
    .subscribe(resposta => {
      this.router.navigate(['usuario']);
    })
  }

  salvarUsuario() {
    if (this.formUsuario.touched && this.formUsuario.dirty) {
      const payload: Usuario = {
        login: this.formUsuario.controls['login'].value,
        senha: this.formUsuario.controls['senha'].value,
        admin: this.formUsuario.controls['admin'].value,
        nome: this.formUsuario.controls['nome'].value,
        cpf: this.formUsuario.controls['cpf'].value,
        endereco: {
          rua: this.formUsuario.controls['rua'].value,
          complemento: this.formUsuario.controls['complemento'].value,
          numero: this.formUsuario.controls['numero'].value,
          cep: this.formUsuario.controls['cep'].value,
          cidade: this.formUsuario.controls['cidade'].value,
          estado: this.formUsuario.controls['estado'].value,
          bairro: this.formUsuario.controls['bairro'].value,    
        }
      };
      this.criarUsuario(payload);
    }
  }
}
