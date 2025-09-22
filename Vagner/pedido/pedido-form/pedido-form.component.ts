import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { PedidoService } from '../../../services/pedido/pedido.service';
import { alertaErro } from '../../../core/utils/alerta-erro';

@Component({
  selector: 'app-pedido-form',
  standalone: true,
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule]
})
export class PedidoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private service = inject(PedidoService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  id = signal<number | null>(null);

  form = this.fb.group({
    usuarioId: [0, Validators.required],   // garante número
    enderecoId: [0, Validators.required],  // garante número
    itens: this.fb.array([])
  });

  get itens() { return this.form.get('itens') as FormArray; }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam && idParam !== 'novo') {
      const id = Number(idParam);
      this.id.set(id);
      this.service.buscarPorId(id).subscribe({
        next: (r) => {
          this.form.patchValue({ 
            usuarioId: r.usuarioId ?? 0, 
            enderecoId: r.enderecoId ?? 0 
          });
          r.itens?.forEach((i: any) => 
            this.itens.push(this.novoItem(i.produtoId, i.quantidade))
          );
        },
        error: (err) => alertaErro(err)
      });
    } else {
      this.adicionarItem(); // começa com 1 item
    }
  }

  novoItem(produtoId: number | null = null, quantidade = 1) {
    return this.fb.group({
      produtoId: [produtoId, Validators.required],
      quantidade: [quantidade, [Validators.required, Validators.min(1)]]
    });
  }

  adicionarItem() { this.itens.push(this.novoItem()); }

  removerItem(i: number) { this.itens.removeAt(i); }

  escolherProduto(i: number) {
    import('../relacionamentos/produto-lookup.modal').then(m => {
      this.dialog.open(m.ProdutoLookupModal).afterClosed().subscribe({
        next: (p) => {
          if (p) this.itens.at(i).patchValue({ produtoId: p.id });
        }
      });
    });
  }

  salvar() {
    const dto = {
      usuarioId: this.form.value.usuarioId ?? 0,
      enderecoId: this.form.value.enderecoId ?? 0,
      itens: this.form.value.itens?.map((x: any) => ({
        produtoId: x.produtoId,
        quantidade: x.quantidade
      })) ?? []
    };

    const id = this.id();
    const req = id ? this.service.atualizar(id, dto) : this.service.criar(dto);

    req.subscribe({
      next: () => this.router.navigate(['/pedidos']),
      error: (err) => alertaErro(err)
    });
  }

  cancelar() { this.router.navigate(['/pedidos']); }
}
