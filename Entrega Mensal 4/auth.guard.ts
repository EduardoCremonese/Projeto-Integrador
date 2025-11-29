import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const autenticado = this.authService.isAuthenticated();

    if (!autenticado) {
      Swal.fire('Acesso negado', 'Você precisa estar logado para acessar esta página.', 'warning');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
