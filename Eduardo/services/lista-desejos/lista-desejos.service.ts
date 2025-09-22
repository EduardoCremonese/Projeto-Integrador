import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { ListaDesejos } from '../../models/lista-desejos/lista-desejos.model';

@Injectable({ providedIn: 'root' })
export class ListaDesejosService {
  private api = inject(ApiService);
  private base = '/listas-desejos';

  listar(f?: any): Observable<ListaDesejos[]> { return this.api.get<ListaDesejos[]>(this.base, f); }
  buscarPorId(id: number): Observable<ListaDesejos> { return this.api.get<ListaDesejos>(`${this.base}/${id}`); }
  criar(dto: Partial<ListaDesejos>): Observable<ListaDesejos> { return this.api.post<ListaDesejos>(this.base, dto); }
  atualizar(id: number, dto: Partial<ListaDesejos>): Observable<ListaDesejos> { return this.api.put<ListaDesejos>(`${this.base}/${id}`, dto); }
  remover(id: number): Observable<void> { return this.api.delete<void>(`${this.base}/${id}`); }

  adicionarProduto(listaId: number, produtoId: number) {
    return this.api.post(`${this.base}/${listaId}/adicionar`, { produtoId });
  }
  removerProduto(listaId: number, produtoId: number) {
    return this.api.post(`${this.base}/${listaId}/remover`, { produtoId });
  }
  porUsuario(usuarioId: number) { return this.api.get<ListaDesejos[]>(`${this.base}/por-usuario`, { usuarioId }); }
}
