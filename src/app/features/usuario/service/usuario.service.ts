import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/http-base/http-base.service';
import { Usuario } from '../model/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends HttpBaseService {
  private readonly endpoint = 'api/usuarios';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.httpGet(this.endpoint);
  }

  criarUsuario(payload: Usuario): Observable<Usuario> {
    return this.httpPost(`${this.endpoint}`, payload);
  }

  alterarUsuario(payload: Usuario): Observable<Usuario> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  excluirUsuario(id: number): Observable<Usuario> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }

  getUsuarioPeloId(id: number): Observable<Usuario> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }
}
