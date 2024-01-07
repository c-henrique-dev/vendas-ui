import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPedidoComponent } from './components/cadastro-pedido/cadastro-pedido.component';
import { ListagemPedidoComponent } from './components/listagem-pedido/listagem-pedido.component';

const routes: Routes = [
  {path: '', component: CadastroPedidoComponent},
  {path: 'detalhes', component: ListagemPedidoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule { }
