import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  imports: [RouterModule, CommonModule]
})
export class ShellComponent {
  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
