import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }
  getToken(): string | null { return localStorage.getItem('token'); }
  setToken(t: string) { localStorage.setItem('token', t); }
  logout() { localStorage.removeItem('token'); }
}
