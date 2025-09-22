import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Pedido } from '../../models/pedido/pedido.model';
import { CriarPedidoRequest } from '../../models/pedido/criar-pedido-request.model';


@Injectable({ providedIn: 'root' })
export class PedidoService {
  private api = inject(ApiService);
  private base = '/pedidos';

  listar(f?: any): Observable<Pedido[]> { return this.api.get<Pedido[]>(this.base, f); }
  buscarPorId(id: number): Observable<Pedido> { return this.api.get<Pedido>(`${this.base}/${id}`); }
  criar(dto: CriarPedidoRequest): Observable<Pedido> { return this.api.post<Pedido>(this.base, dto); }
  atualizar(id: number, dto: Partial<Pedido>): Observable<Pedido> { return this.api.put<Pedido>(`${this.base}/${id}`, dto); }
  remover(id: number): Observable<void> { return this.api.delete<void>(`${this.base}/${id}`); }

  porUsuario(usuarioId: number) { return this.api.get<Pedido[]>(`${this.base}/por-usuario`, { usuarioId }); }
  porStatus(status: string) { return this.api.get<Pedido[]>(`${this.base}/por-status`, { status }); }
  entreDatas(inicio: string, fim: string) { return this.api.get<Pedido[]>(`${this.base}/entre-datas`, { inicio, fim }); }
}
