import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/auth/auth.guard';
import { HomeComponent } from './common/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'produto',
    loadChildren: () =>
      import('./features/produto/produto.module').then((m) => m.ProdutoModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('./common/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'usuario',
    loadChildren: () =>
      import('./features/usuario/usuario.module').then((m) => m.UsuarioModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'pedido',
    loadChildren: () =>
      import('./features/pedido/pedido.module').then((m) => m.PedidoModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'item',
    loadChildren: () =>
      import('./features/item/item.module').then((m) => m.ItemModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
