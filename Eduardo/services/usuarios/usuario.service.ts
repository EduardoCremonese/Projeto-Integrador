import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Usuario } from '../../models/usuario/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = inject(ApiService);
  private base = '/usuarios';

  listar(f?: any): Observable<Usuario[]> { return this.api.get<Usuario[]>(this.base, f); }
  buscarPorId(id: number): Observable<Usuario> { return this.api.get<Usuario>(`${this.base}/${id}`); }
  criar(dto: Partial<Usuario>): Observable<Usuario> { return this.api.post<Usuario>(this.base, dto); }
  atualizar(id: number, dto: Partial<Usuario>): Observable<Usuario> { return this.api.put<Usuario>(`${this.base}/${id}`, dto); }
  remover(id: number): Observable<void> { return this.api.delete<void>(`${this.base}/${id}`); }

  // filtros comuns
  porEmail(email: string) { return this.api.get<Usuario[]>(`${this.base}/por-email`, { email }); }
  porNome(nome: string) { return this.api.get<Usuario[]>(`${this.base}/por-nome`, { nome }); }
}
