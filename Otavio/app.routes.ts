// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ShellComponent } from './components/layout/shell/shell.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // rota inicial → home
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      // HOME
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent)
      },

      // PRODUTOS
      {
        path: 'produtos',
        loadComponent: () =>
          import('./components/produtos/produtos.component').then(m => m.ProdutosComponent)
      },

      // SOBRE
      {
        path: 'sobre',
        loadComponent: () =>
          import('./components/sobre/sobre.component').then(m => m.SobreComponent)
      },

      // CONTATOS
      {
        path: 'contatos',
        loadComponent: () =>
          import('./components/contatos/contatos.component').then(m => m.ContatosComponent)
      },

      // CONTA
      {
        path: 'conta',
        loadComponent: () =>
          import('./components/conta/conta.component').then(m => m.ContaComponent)
      },

      // USUÁRIOS
      {
        path: 'usuarios',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/usuarios/usuario-list/usuario-list.component')
                .then(m => m.UsuarioListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/usuarios/usuario-form/usuario-form.component')
                .then(m => m.UsuarioFormComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/usuarios/usuario-form/usuario-form.component')
                .then(m => m.UsuarioFormComponent)
          },
        ]
      },

      // ENDEREÇOS
      {
        path: 'enderecos',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/enderecos/endereco-list/endereco-list.component')
                .then(m => m.EnderecoListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/enderecos/endereco-form/endereco-form.component')
                .then(m => m.EnderecoFormComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/enderecos/endereco-form/endereco-form.component')
                .then(m => m.EnderecoFormComponent)
          },
        ]
      },

      // PEDIDOS
      {
        path: 'pedidos',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/pedido/pedido-list/pedido-list.component')
                .then(m => m.PedidoListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/pedido/pedido-form/pedido-form.component')
                .then(m => m.PedidoFormComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/pedido/pedido-form/pedido-form.component')
                .then(m => m.PedidoFormComponent)
          },
        ]
      },

      // LISTA DE DESEJOS
      {
        path: 'listas-desejos',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/listas-desejos/lista-desejos-list/lista-desejos-list.component')
                .then(m => m.ListaDesejosListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/listas-desejos/lista-desejos-form/lista-desejos-form.component')
                .then(m => m.ListaDesejosFormComponent)
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./components/listas-desejos/lista-desejos-form/lista-desejos-form.component')
                .then(m => m.ListaDesejosFormComponent)
          },
        ]
      }
    ]
  },

  // fallback → se não encontrar rota, volta pro home
  { path: '**', redirectTo: 'home' }
];
