import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ *ngFor, currency
import { FormsModule } from '@angular/forms';     // ✅ [(ngModel)]
import { RouterModule } from '@angular/router';   // ✅ [routerLink]

import { Produto } from '../../../models/produto/produto.model';
import { ProdutoService } from '@services/produtos/produto.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-produto-list',
  standalone: true, // ✅ importante!
  templateUrl: './produto-list.component.html',
  imports: [CommonModule, FormsModule, RouterModule] // ✅ corrige todos os erros do template
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  filtroNome: string = '';

  constructor(
    private produtoService: ProdutoService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listar({ nome: this.filtroNome }).subscribe({
      next: (data: Produto[]) => (this.produtos = data), // ✅ tipagem explícita
      error: (error: any) =>
        this.alertService.error(error.error?.message || 'Erro ao carregar produtos'),
    });
  }

  excluirProduto(id: number) {
    this.alertService.confirm('Deseja realmente excluir este produto?').then((confirmado: boolean) => { // ✅ tipagem
      if (confirmado) {
        this.produtoService.excluir(id).subscribe({
          next: () => {
            this.alertService.success('Produto excluído com sucesso');
            this.carregarProdutos();
          },
          error: (error: any) =>
            this.alertService.error(error.error?.message || 'Erro ao excluir produto'),
        });
      }
    });
  }

  aplicarFiltro() {
    this.carregarProdutos();
  }

  limparFiltro() {
    this.filtroNome = '';
    this.carregarProdutos();
  }
}
