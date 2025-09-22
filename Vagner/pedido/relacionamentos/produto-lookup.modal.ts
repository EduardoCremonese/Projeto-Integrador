import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProdutoService } from '../../../services/produtos/produto.service';
import { Produto } from '../../../models/produto/produto.model';
import { alertaErro } from '../../../core/utils/alerta-erro';

@Component({
  standalone: true,
  selector: 'app-produto-lookup-modal',
  template: `
  <h2 mat-dialog-title>Selecionar Produto</h2>
  <div mat-dialog-content>
    <form [formGroup]="filtro" (ngSubmit)="buscar()" class="filtros">
      <input type="text" placeholder="Nome" formControlName="nome">
      <button type="submit">Buscar</button>
    </form>
    <table mat-table [dataSource]="data">
      <ng-container matColumnDef="id"><th mat-header-cell *matHeaderCellDef>#</th><td mat-cell *matCellDef="let r">{{r.id}}</td></ng-container>
      <ng-container matColumnDef="nome"><th mat-header-cell *matHeaderCellDef>Nome</th><td mat-cell *matCellDef="let r">{{r.nome}}</td></ng-container>
      <ng-container matColumnDef="preco"><th mat-header-cell *matHeaderCellDef>Preço</th><td mat-cell *matCellDef="let r">R$ {{r.preco | number:'1.2-2'}}</td></ng-container>
      <ng-container matColumnDef="acao"><th mat-header-cell *matHeaderCellDef></th><td mat-cell *matCellDef="let r"><button (click)="selecionar(r)">Selecionar</button></td></ng-container>
      <tr mat-header-row *matHeaderRowDef="displayed"></tr>
      <tr mat-row *matRowDef="let row; columns: displayed;"></tr>
    </table>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="fechar()">Fechar</button>
  </div>
  `,
  imports: [CommonModule, MatDialogModule, MatTableModule, ReactiveFormsModule]
})
export class ProdutoLookupModal implements OnInit {
  private ref = inject(MatDialogRef<ProdutoLookupModal>);
  private service = inject(ProdutoService);
  private fb = inject(FormBuilder);

  displayed = ['id','nome','preco','acao'];
  data: Produto[] = [];
  filtro = this.fb.group({ nome: [''] });

  ngOnInit() { this.buscar(); }

  buscar() {
    this.service.listar(this.filtro.value).subscribe({
      next: (res) => this.data = res,
      error: (err) => alertaErro(err)
    });
  }

  selecionar(p: Produto) { this.ref.close(p); }

  fechar() { this.ref.close(); }
}
