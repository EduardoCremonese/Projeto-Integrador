import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl; // ex.: http://localhost:8082

  get<T>(url: string, params?: Record<string, any>) {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== null && v !== undefined && v !== '') {
          httpParams = httpParams.set(k, String(v));
        }
      });
    }
    return this.http.get<T>(`${this.base}${url}`, { params: httpParams });
  }
  post<T>(url: string, body: any)  { return this.http.post<T>(`${this.base}${url}`, body); }
  put<T>(url: string, body: any)   { return this.http.put<T>(`${this.base}${url}`, body); }
  delete<T>(url: string)           { return this.http.delete<T>(`${this.base}${url}`); }
}
