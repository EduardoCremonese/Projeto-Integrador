import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <h2>Criar Conta</h2>
      <form (ngSubmit)="registrar()">

        <label>Nome completo</label>
        <input type="text" [(ngModel)]="usuario.nome" name="nome" required />

        <label>Email</label>
        <input type="email" [(ngModel)]="usuario.email" name="email" required />

        <label>Telefone</label>
        <input type="tel" [(ngModel)]="usuario.telefone" name="telefone" required />

        <label>Senha</label>
        <input type="password" [(ngModel)]="usuario.senha" name="senha" required />

        <h4>Endereço</h4>
        <label>Logradouro</label>
        <input type="text" [(ngModel)]="usuario.endereco.logradouro" name="logradouro" required />

        <label>Bairro</label>
        <input type="text" [(ngModel)]="usuario.endereco.bairro" name="bairro" required />

        <label>Cidade</label>
        <input type="text" [(ngModel)]="usuario.endereco.cidade" name="cidade" required />

        <label>Estado</label>
        <input type="text" [(ngModel)]="usuario.endereco.estado" name="estado" required />

        <label>CEP</label>
        <input type="text" [(ngModel)]="usuario.endereco.cep" name="cep" required />

        <label>Número</label>
        <input type="text" [(ngModel)]="usuario.endereco.numero" name="numero" required />

        <button type="submit" class="btn">Cadastrar</button>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 480px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    form { display: flex; flex-direction: column; gap: .8rem; }
    label { font-weight: 500; color: #333; }
    input {
      padding: .5rem;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .btn {
      margin-top: 1rem;
      background: #1976d2;
      color: #fff;
      border: none;
      padding: .7rem;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn:hover { background: #0d47a1; }
  `]
})
export class RegisterComponent {
  usuario = {
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    role: 'USER',             // ✅ compatível com o enum Role.java
    statusCadastro: 'ATIVO',
    endereco: {
      logradouro: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: '',
      numero: ''
    }
  };

  private apiUrl = 'http://localhost:8082/auth/register'; // ✅ backend local

  constructor(private http: HttpClient, private router: Router) {}

  registrar() {
    console.log('📦 Enviando payload:', this.usuario);

    this.http.post<any>(this.apiUrl, this.usuario).subscribe({
      next: () => {
        Swal.fire('✅ Sucesso', 'Cadastro realizado com sucesso!', 'success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        Swal.fire('Erro!', 'Não foi possível realizar o cadastro.', 'error');
      }
    });
  }
}
