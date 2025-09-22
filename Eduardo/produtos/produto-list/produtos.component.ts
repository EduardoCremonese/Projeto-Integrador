import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

  adicionarCarrinho() {
    this.cartService.adicionarProduto();
  }
}
