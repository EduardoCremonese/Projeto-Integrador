import { Routes } from '@angular/router';
import { ShellComponent } from './components/layout/shell/shell.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard'; // ✅ Novo Guard para Admin

export const routes: Routes = [
  // 🔹 Rota inicial → home
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // 🔹 Layout principal com rotas filhas
  {
    path: '',
    component: ShellComponent,
    children: [
      // ========================
      // 🏠 HOME (livre)
      // ========================
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(m => m.HomeComponent)
      },

      // ========================
      // 🛒 PRODUTOS (autenticado)
      // ========================
      {
        path: 'produtos',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./components/produto/produto-list/produto-list.component')
                .then(m => m.ProdutoListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/produto/produto-form/produto-form.component')
                .then(m => m.ProdutoFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./components/produto/produto-form/produto-form.component')
                .then(m => m.ProdutoFormComponent)
          }
        ]
      },

      // ========================
      // 👥 USUÁRIOS (ADMIN apenas)
      // ========================
      {
        path: 'usuarios',
        canActivate: [AdminGuard], // 🔒 Apenas ROLE_ADMIN pode acessar
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./components/usuario/usuario-list/usuario-list.component')
                .then(m => m.UsuarioListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/usuario/usuario-form/usuario-form.component')
                .then(m => m.UsuarioFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./components/usuario/usuario-form/usuario-form.component')
                .then(m => m.UsuarioFormComponent)
          }
        ]
      },

      // ========================
      // 📦 PEDIDOS (autenticado)
      // ========================
      {
        path: 'pedidos',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
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
            path: 'editar/:id',
            loadComponent: () =>
              import('./components/pedido/pedido-form/pedido-form.component')
                .then(m => m.PedidoFormComponent)
          }
        ]
      },

      // ========================
      // 💖 LISTA DE DESEJOS (autenticado)
      // ========================
      {
        path: 'lista-desejos',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./components/lista-desejos/lista-desejos-list/lista-desejos-list.component')
                .then(m => m.ListaDesejosListComponent)
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./components/lista-desejos/lista-desejos-form/lista-desejos-form.component')
                .then(m => m.ListaDesejosFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./components/lista-desejos/lista-desejos-form/lista-desejos-form.component')
                .then(m => m.ListaDesejosFormComponent)
          }
        ]
      },

      // ========================
      // 📍 ENDEREÇOS (autenticado)
      // ========================
      {
        path: 'enderecos',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
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
            path: 'editar/:id',
            loadComponent: () =>
              import('./components/enderecos/endereco-form/endereco-form.component')
                .then(m => m.EnderecoFormComponent)
          }
        ]
      },

      // ========================
      // 📘 PÁGINAS LIVRES
      // ========================
      {
        path: 'sobre',
        loadComponent: () =>
          import('./components/sobre/sobre.component').then(m => m.SobreComponent)
      },
      {
        path: 'conta',
        loadComponent: () =>
          import('./components/auth/conta/conta.component').then(m => m.ContaComponent)
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register', // ✅ Tela de cadastro de usuário
        loadComponent: () =>
          import('./components/auth/register/register.component').then(m => m.RegisterComponent)
      }
    ]
  },

  // ========================
  // 🚨 Fallback
  // ========================
  { path: '**', redirectTo: 'home' }
];
