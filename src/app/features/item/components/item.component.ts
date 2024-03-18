import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from '../model/item.model';
import { Produto } from '../../produto/models/produto.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  id!: string;
  itens!: Item[];
  total!: number;

  constructor(
    private itemService: ItemService,
    private activatedRouter: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    const id = this.id = this.activatedRouter.snapshot.url[1].path;
    this.getDetalhesPedido(+id);
  }

  getDetalhesPedido(id: number) {
    this.itemService.getItensPeloIdPedido(id).subscribe((itens) => {
      this.itens = itens;
      this.total = itens.reduce(
        (acumulador: number, item: Item) =>
          acumulador + item.produto.precoUnitario * item.quantidade,
        0
      );
    })
  }


}
