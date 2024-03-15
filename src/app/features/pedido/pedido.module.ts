import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoRoutingModule } from './pedido-routing.module';
import { FinalizarPedidoComponent } from './components/finalizar-pedido/finalizar-pedido.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListagemPedidoComponent } from './components/listagem-pedido/listagem-pedido.component';

@NgModule({
  declarations: [FinalizarPedidoComponent, ListagemPedidoComponent],
  imports: [CommonModule, PedidoRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class PedidoModule {}
