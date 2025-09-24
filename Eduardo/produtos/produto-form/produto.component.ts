import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // ✅ necessário para [(ngModel)]
import { Produto } from '@models/produto/produto.model';
import { ProdutoService } from '@services/produtos/produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto',
  standalone: true,  // ✅ caso esteja usando Angular Standalone Components
  imports: [
    CommonModule,
    FormsModule      // ✅ habilita [(ngModel)]
  ],
  templateUrl: './produto.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  filtroNome: string = '';

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.produtoService.listar({ nome: this.filtroNome }).subscribe({
      next: (dados) => (this.produtos = dados),
      error: (err) => Swal.fire('Erro', err.error, 'error')
    });
  }

  adicionarCarrinho(produto: Produto): void {
    // Aqui você pode implementar a lógica real do carrinho
    Swal.fire('Carrinho', `${produto.nome} adicionado ao carrinho!`, 'success');
  }

  excluir(id: number): void {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação não pode ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produtoService.excluir(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Produto removido com sucesso.', 'success');
            this.listar();
          },
          error: (err) => Swal.fire('Erro', err.error, 'error')
        });
      }
    });
  }
}
