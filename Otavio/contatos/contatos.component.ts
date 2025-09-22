// src/app/components/contatos/contatos.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']   // usa css, não scss, a não ser que você tenha criado .scss
})
export class ContatosComponent {}
