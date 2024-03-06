import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ListagemProdutoComponent } from './components/listagem-produto/listagem-produto.component';
import { CadastroProdutoComponent } from './components/cadastro-produto/cadastro-produto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalheProdutoComponent } from './components/detalhe-produto/detalhe-produto.component';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';

@NgModule({
  declarations: [
    ListagemProdutoComponent,
    CadastroProdutoComponent,
    DetalheProdutoComponent,
    ConfirmacaoDialogComponent,
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class ProdutoModule {}
