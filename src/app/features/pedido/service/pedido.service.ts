import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/http-base/http-base.service';
import { PedidoSalvar } from '../model/pedido-salvar.model';
import { PedidoDetalhes } from '../model/pedido-detalhes.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends HttpBaseService {
  private readonly endpoint = 'api/pedidos';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  criarPedido(payload: PedidoSalvar): Observable<PedidoSalvar> {
    return this.httpPost(`${this.endpoint}`, payload);
  }

  getPedidoPeloLogin(login: string): Observable<PedidoDetalhes[]> {
    return this.httpGet(`${this.endpoint}/${login}`);
  }
}
