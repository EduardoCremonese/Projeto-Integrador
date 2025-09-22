import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../../models/endereco/endereco.model';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class EnderecoService {
  private api = inject(ApiService);
  private base = '/enderecos';

  listar(f?: any): Observable<Endereco[]> { return this.api.get<Endereco[]>(this.base, f); }
  buscarPorId(id: number): Observable<Endereco> { return this.api.get<Endereco>(`${this.base}/${id}`); }
  criar(dto: Partial<Endereco>): Observable<Endereco> { return this.api.post<Endereco>(this.base, dto); }
  atualizar(id: number, dto: Partial<Endereco>): Observable<Endereco> { return this.api.put<Endereco>(`${this.base}/${id}`, dto); }
  remover(id: number): Observable<void> { return this.api.delete<void>(`${this.base}/${id}`); }

  porCidade(cidade: string) { return this.api.get<Endereco[]>(`${this.base}/por-cidade`, { cidade }); }
  porUsuario(usuarioId: number) { return this.api.get<Endereco[]>(`${this.base}/por-usuario`, { usuarioId }); }
}
