import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // sinal que guarda o contador do carrinho
  cartCount = signal<number>(parseInt(localStorage.getItem('cartCount') || '0', 10));

  adicionarProduto() {
    this.cartCount.update(c => {
      const novo = c + 1;
      localStorage.setItem('cartCount', String(novo));
      return novo;
    });
  }

  limparCarrinho() {
    this.cartCount.set(0);
    localStorage.removeItem('cartCount');
  }
}
