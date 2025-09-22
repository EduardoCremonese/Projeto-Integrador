import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ProdutoService } from '../../../services/produtos/produto.service';
import { Produto } from '../../../models/produto/produto.model';
import { alertaErro } from '../../../core/utils/alerta-erro';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule]
})
export class ProdutoListComponent implements OnInit {
  private service = inject(ProdutoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  displayed = ['id', 'nome', 'preco', 'estoque', 'ativo', 'acoes'];
  data: Produto[] = [];

  filtroForm = this.fb.group({
    nome: [''],
    min: [''],
    max: [''],
    ativo: ['']
  });

  ngOnInit() { this.buscar(); }

  buscar() {
    this.service.listar(this.filtroForm.value).subscribe({
      next: (res) => this.data = res,
      error: (err) => alertaErro(err)
    });
  }

  novo() { this.router.navigate(['/produtos/novo']); }
  editar(p: Produto) { this.router.navigate(['/produtos', p.id]); }
  excluir(p: Produto) {
    this.service.remover(p.id).subscribe({
      next: () => this.buscar(),
      error: (err) => alertaErro(err)
    });
  }
}
