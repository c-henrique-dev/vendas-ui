import { Injectable, Injector } from '@angular/core';
import { HttpBaseService } from 'src/app/shared/http-base/http-base.service';
import { Item } from '../model/item.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends HttpBaseService {
  private readonly endpoint = 'api/itens';

  constructor(protected override readonly injector: Injector) {
    super(injector);
  }

  getItensPeloIdPedido(id: number): Observable<any> {
    return this.httpGet(`${this.endpoint}/${id}`);
  }
}
