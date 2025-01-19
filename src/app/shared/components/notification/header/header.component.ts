import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="main-header">
      <div class="container">
        <nav class="nav-menu">
          <a routerLink="/" class="logo">Event Manager</a>
          <div class="nav-links">
            <a routerLink="/events" routerLinkActive="active">Events</a>
            <a routerLink="/artists" routerLinkActive="active">Artists</a>
          </div>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .main-header {
        background: var(--bg-secondary);
        box-shadow: var(--shadow-sm);
        padding: var(--spacing-sm) 0;
      }

      .nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--primary-color);
        text-decoration: none;
      }

      .nav-links {
        display: flex;
        gap: var(--spacing-md);

        a {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;

          &:hover,
          &.active {
            color: var(--primary-color);
          }
        }
      }
    `,
  ],
})
export class HeaderComponent {}
