import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { MaterialModule } from 'src/app/shared/material/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EnderecoModule } from 'src/app/shared/endereco/endereco.module';
import { ListagemUsuarioComponent } from './components/listagem-usuario/listagem-usuario.component';

@NgModule({
  declarations: [CadastroUsuarioComponent, ListagemUsuarioComponent],
  imports: [CommonModule, UsuarioRoutingModule, MaterialModule, ReactiveFormsModule, EnderecoModule],
})
export class UsuarioModule {}
