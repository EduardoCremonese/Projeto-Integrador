import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';     // ✅ *ngIf, etc.
import { FormsModule } from '@angular/forms';       // ✅ [(ngModel)]
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Produto } from '../../../models/produto/produto.model';
import { ProdutoService } from '@services/produtos/produto.service';
import { AlertService } from '@core/services/alert.service';

@Component({
  selector: 'app-produto-form',
  standalone: true, // ✅ standalone
  templateUrl: './produto-form.component.html',
  imports: [CommonModule, FormsModule, RouterModule] // ✅ módulos necessários
})
export class ProdutoFormComponent implements OnInit {
  produto: Produto = {
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0
  };

  isEditando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditando = true;
      this.carregarProduto(+id); // ✅ converte pra number
    }
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id).subscribe({
      next: (data: Produto) => (this.produto = data), // ✅ tipagem
      error: (error: any) => {
        this.alertService.error(error.error?.message || 'Erro ao carregar produto');
        this.router.navigate(['/produtos']);
      }
    });
  }

  salvar() {
    const operacao = this.isEditando
      ? this.produtoService.atualizar(this.produto.id!, this.produto)
      : this.produtoService.salvar(this.produto);

    operacao.subscribe({
      next: () => {
        this.alertService.success(
          `Produto ${this.isEditando ? 'atualizado' : 'criado'} com sucesso`
        );
        this.router.navigate(['/produtos']);
      },
      error: (error: any) =>
        this.alertService.error(error.error?.message || 'Erro ao salvar produto')
    });
  }

  voltar() {
    this.router.navigate(['/produtos']);
  }
}
