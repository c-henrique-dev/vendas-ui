import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/shared/http-base/http-base.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends HttpBaseService {
  private readonly endpoint = 'api/produtos';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getProdutos(): Observable<Produto[]> {
    return this.httpGet(this.endpoint);
  }

  criarProduto(payload: Produto) {
    return this.httpPost(`${this.endpoint}`, payload);
  }

  adicionarImagem(id: number, file: File) {
    const formData: FormData = new FormData();
    formData.append('imagem', file);
    return this.httpPost(`${this.endpoint}/${id}`, formData);
  }

  alterarProduto(payload: Produto): Observable<Produto> {
    return this.httpPut(`${this.endpoint}/${payload.id}`, payload);
  }

  excluirProduto(id: number): Observable<Produto> {
    return this.httpDelete(`${this.endpoint}/${id}`);
  }

  getProdutoPeloId(id: number): Observable<Produto> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }
}
