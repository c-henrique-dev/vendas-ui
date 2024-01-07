import { Injectable } from '@angular/core';
import { Item } from 'src/app/features/pedido/model/item.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  itensCarrinho: Item[] = [];

  adicionarItemAoCarrinho(item: Item) {
    this.itensCarrinho.push(item);
  }

  obterItensCarrinho() {
    return this.itensCarrinho;
  }

  resetarCarrinho() {
    this.itensCarrinho.length = 0;
  }
}
