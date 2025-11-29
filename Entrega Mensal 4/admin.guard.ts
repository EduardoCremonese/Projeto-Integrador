import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getUserRole() === 'ROLE_ADMIN') {
      return true;
    }

    Swal.fire({
      icon: 'error',
      title: 'Acesso negado',
      text: 'Você não tem permissão para acessar esta página.',
      confirmButtonText: 'OK'
    });

    this.router.navigate(['/home']);
    return false;
  }
}
