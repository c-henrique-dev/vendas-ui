import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.interface';
import { AuthenticationService } from '../../service/authentication.service';
import { SnackBarService } from 'src/app/shared/snack-bar/snack-bar.service';
import { CadastroUsuarioComponent } from 'src/app/features/usuario/components/cadastro-usuario/cadastro-usuario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authLogin!: Login;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBarService: SnackBarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.compose([Validators.required, Validators.email])],
      senha: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  login() {
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);

    this.authLogin.login = this.authLogin.login;

    this.authenticationService
      .login({ login: this.authLogin.login, senha: this.authLogin.senha })
      .subscribe({
        next: () => {
          this.router.navigate(['produto']);
        },
        error: (erro) => {
          this.snackBarService.open('Usuário ou Senha inválido(s)!');
        },
      });
  }

  exibirDialogCadastroUsuario() {
    this.dialog.open(CadastroUsuarioComponent, {
      data: { titulo: 'Cadastrar Usuário' },
      height: '60%',
    });
  }
}
