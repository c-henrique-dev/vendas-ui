import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { ListagemPedidoComponent } from './components/listagem-pedido/listagem-pedido.component';
import { ItemComponent } from '../item/components/item.component';

const routes: Routes = [
  { path: '', component: ListagemPedidoComponent },
  { path: 'finalizar', component: FinalizarPedidoComponent },
  { path: 'itens/:id', component: ItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoRoutingModule {}
