import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/cadastro-usuario/cadastro-usuario.component';
import { ListagemUsuarioComponent } from './components/listagem-usuario/listagem-usuario.component';

const routes: Routes = [
  { path: 'cadastrar', component: CadastroUsuarioComponent },
  { path: '', component: ListagemUsuarioComponent },
  {path: 'editar/:id', component: CadastroUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
