import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 👈 importamos também o RouterModule
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  standalone: true,   // 👈 importante no Angular 19
  imports: [RouterModule] // 👈 incluímos o RouterModule
})
export class TopbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
