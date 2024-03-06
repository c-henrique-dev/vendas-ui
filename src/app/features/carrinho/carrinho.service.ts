import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Item } from 'src/app/features/pedido/model/item.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  itensCarrinho: Item[] = JSON.parse(
    localStorage.getItem('itensCarrinho') || '[]'
  );

  private carrinhoAtualizadoSubject = new Subject<number>();

  adicionarItemAoCarrinho(item: Item): Observable<Item> {
    let itemEncontrado = false;

    for (let i = 0; i < this.itensCarrinho.length; i++) {
      if (this.itensCarrinho[i].produto.id === item.produto.id) {
        this.itensCarrinho[i].quantidade =
          Number(this.itensCarrinho[i].quantidade) + 1;
        itemEncontrado = true;
        break;
      }
    }

    if (!itemEncontrado) {
      this.itensCarrinho.push(item);
    }

    localStorage.setItem('itensCarrinho', JSON.stringify(this.itensCarrinho));

    this.carrinhoAtualizadoSubject.next(this.itensCarrinho.length);

    return of(item);
  }

  obterItensCarrinho(): Observable<Item[]> {
    return of(this.itensCarrinho);
  }

  removerItemDoCarrinho(id: number): Observable<Item | undefined> {
    const itemRemovido = this.itensCarrinho.find(
      (item) => item.produto.id === id
    );

    if (itemRemovido) {
      this.itensCarrinho = this.itensCarrinho.filter(
        (item) => item.produto.id !== id
      );
      localStorage.setItem('itensCarrinho', JSON.stringify(this.itensCarrinho));
      this.carrinhoAtualizadoSubject.next(this.itensCarrinho.length);
    }

    return of(itemRemovido);
  }

  resetarCarrinho(): Observable<Item[]> {
    this.itensCarrinho = [];
    localStorage.setItem('itensCarrinho', JSON.stringify(this.itensCarrinho));

    this.carrinhoAtualizadoSubject.next(this.itensCarrinho.length);

    return of(this.itensCarrinho);
  }

  getCarrinhoAtualizado(): Observable<number> {
    return this.carrinhoAtualizadoSubject.asObservable();
  }
}
