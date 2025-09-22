import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProdutoService } from '../../../services/produtos/produto.service';
import { alertaErro } from '../../../core/utils/alerta-erro';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule
  ]
})
export class ProdutoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(ProdutoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = signal<number | null>(null);

  form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    descricao: [''],
    preco: [0, [Validators.required, Validators.min(0)]],
    estoque: [0, [Validators.required, Validators.min(0)]],
    ativo: [true]   // ⚠️ manter só se o backend tem esse campo
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'novo') {
      const id = Number(idParam);
      this.id.set(id);
      this.service.buscarPorId(id).subscribe({
        next: (r) => this.form.patchValue({
          nome: r.nome,
          descricao: r.descricao,
          preco: r.preco,
          estoque: r.estoque,
        }),
        error: (err) => alertaErro(err)
      });
    }
  }

  salvar() {
    const dto = {
      nome: this.form.value.nome ?? '',
      descricao: this.form.value.descricao ?? '',
      preco: this.form.value.preco ?? 0,
      estoque: this.form.value.estoque ?? 0,
      ativo: this.form.value.ativo ?? true
    };

    const id = this.id();
    const req = id ? this.service.atualizar(id, dto) : this.service.criar(dto);

    req.subscribe({
      next: () => this.router.navigate(['/produtos']),
      error: (err) => alertaErro(err)
    });
  }

  cancelar() { this.router.navigate(['/produtos']); }
}
