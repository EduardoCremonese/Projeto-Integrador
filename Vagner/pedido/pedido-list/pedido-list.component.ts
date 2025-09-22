import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { PedidoService } from '../../../services/pedido/pedido.service';
import { Pedido } from '../../../models/pedido/pedido.model';
import { alertaErro } from '../../../core/utils/alerta-erro';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatButtonModule]
})
export class PedidoListComponent implements OnInit {
  private service = inject(PedidoService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  displayed = ['id', 'usuarioId', 'enderecoId', 'status', 'valorTotal', 'acoes'];
  data: Pedido[] = [];

  filtro = this.fb.group({
    usuarioId: [''],
    status: [''],
    inicio: [''],
    fim: ['']
  });

  ngOnInit() { this.buscar(); }

  buscar() {
    this.service.listar(this.filtro.value).subscribe({
      next: (res) => this.data = res,
      error: (err) => alertaErro(err)
    });
  }

  novo() { this.router.navigate(['/pedidos/novo']); }
  editar(p: Pedido) { this.router.navigate(['/pedidos', p.id]); }
  excluir(p: Pedido) {
    this.service.remover(p.id).subscribe({
      next: () => this.buscar(),
      error: (err) => alertaErro(err)
    });
  }
}
