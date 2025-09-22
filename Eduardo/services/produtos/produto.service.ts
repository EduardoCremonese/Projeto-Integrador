import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Produto } from '../../models/produto/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private api = inject(ApiService);
  private base = '/produtos';

  listar(f?: any): Observable<Produto[]> { return this.api.get<Produto[]>(this.base, f); }
  buscarPorId(id: number): Observable<Produto> { return this.api.get<Produto>(`${this.base}/${id}`); }
  criar(dto: Partial<Produto>): Observable<Produto> { return this.api.post<Produto>(this.base, dto); }
  atualizar(id: number, dto: Partial<Produto>): Observable<Produto> { return this.api.put<Produto>(`${this.base}/${id}`, dto); }
  remover(id: number): Observable<void> { return this.api.delete<void>(`${this.base}/${id}`); }

  // filtros personalizados
  porNome(nome: string) { return this.api.get<Produto[]>(`${this.base}/por-nome`, { nome }); }
  faixaPreco(min?: number, max?: number) { return this.api.get<Produto[]>(`${this.base}/faixa-preco`, { min, max }); }
  ativos(ativo: boolean) { return this.api.get<Produto[]>(`${this.base}/ativos`, { ativo }); }
}
