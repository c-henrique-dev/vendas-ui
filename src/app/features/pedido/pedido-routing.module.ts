import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { ListagemPedidoComponent } from './components/listagem-pedido/listagem-pedido.component';

const routes: Routes = [
  {path: '', component: FinalizarPedidoComponent},
  {path: 'detalhes', component: ListagemPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
