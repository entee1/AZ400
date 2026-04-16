import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout">
      <nav class="sidebar">
        <div class="logo">
          <h2>InsuranceApp</h2>
        </div>
        <ul class="nav-links">
          <li>
            <a routerLink="/quote" routerLinkActive="active">
              <span class="icon">📝</span> Quote
            </a>
          </li>
          <li>
            <a routerLink="/bind" routerLinkActive="active">
              <span class="icon">✅</span> Bind
            </a>
          </li>
          <li>
            <a routerLink="/documents" routerLinkActive="active">
              <span class="icon">📁</span> Documents
            </a>
          </li>
        </ul>
      </nav>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .app-layout { display: flex; min-height: 100vh; }
    .sidebar { width: 250px; background: #1e3a5f; color: white; padding: 20px; }
    .logo { padding-bottom: 20px; border-bottom: 1px solid #3b5998; margin-bottom: 20px; }
    .logo h2 { margin: 0; font-size: 24px; }
    .nav-links { list-style: none; padding: 0; margin: 0; }
    .nav-links li { margin-bottom: 8px; }
    .nav-links a { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #cbd5e1; text-decoration: none; border-radius: 6px; transition: background 0.2s; }
    .nav-links a:hover { background: #3b5998; color: white; }
    .nav-links a.active { background: #2563eb; color: white; }
    .icon { font-size: 20px; }
    .content { flex: 1; padding: 40px; background: #f8fafc; }
  `]
})
export class App {}
