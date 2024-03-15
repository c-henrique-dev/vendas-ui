import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemProdutoComponent } from './components/listagem-produto/listagem-produto.component';
import { DetalheProdutoComponent } from './components/detalhe-produto/detalhe-produto.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { FinalizarPedidoComponent } from '../pedido/components/finalizar-pedido/finalizar-pedido.component';

const routes: Routes = [
  { path: '', component: ListagemProdutoComponent },
  { path: 'cadastrar', component: CadastroProdutoComponent },
  { path: 'editar/:id', component: CadastroProdutoComponent },
  { path: ':id', component: DetalheProdutoComponent },
  { path: ':id/pedido/detalhes', component: FinalizarPedidoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
