import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Login } from '../models/login.interface';
import { HttpBaseService } from 'src/app/shared/http-base/http-base.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/features/usuario/model/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends HttpBaseService {
  private subjectUsuario: BehaviorSubject<any> = new BehaviorSubject(null);
  private subjectLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private readonly endpoint = 'api/usuarios';

  constructor(
    protected override readonly injector: Injector,
    private router: Router
  ) {
    super(injector);
  }

  login(login: Login): Observable<void> {
    return this.httpPost(`${this.endpoint}/auth`, login).pipe(
      map((resposta) => {
        sessionStorage.setItem('token', resposta.token);
        const decodificado = this.decodeToken(resposta.token);
        this.subjectUsuario.next(decodificado);
        this.subjectLogin.next(true);
      })
    );
  }

  sair() {
    sessionStorage.removeItem('token');
    this.subjectUsuario.next(null);
    this.subjectLogin.next(false);
    this.router.navigate(['auth/login']);
  }

  usuarioEstaLogado(): Observable<boolean> {
    const token = sessionStorage.getItem('token');

    if (token) {
      const tokenInfo = this.decodeToken(token);
      const isTokenExpired = tokenInfo.exp < Date.now() / 1000;

      if (isTokenExpired) {
        this.sair();
      } else {
        this.subjectLogin.next(true);
      }
    }

    return this.subjectLogin.asObservable();
  }
  
  obterUsuarioLogado(): Observable<Usuario> {
    return this.httpGet(`${this.endpoint}/usuarioLogado`);
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}
