import { Component, HostBinding } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router, RouterModule, UrlTree } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { authActions } from '../../auth/store/auth.actions';

interface MenuLink {
  label: string;
  routerLink: string;
  iconName: string;
  iconStyle: 'light' | 'bulk';
  counter?: number;
  hovered?: boolean;
}

const menuLinks: MenuLink[] = [
  {
    label: 'Dashboard',
    routerLink: 'dashboard',
    iconName: 'category',
    iconStyle: 'light',
  },
  {
    label: 'Orders',
    routerLink: 'orders',
    iconName: 'bag',
    iconStyle: 'light',
  },
  {
    label: 'Customers',
    routerLink: 'customers',
    iconName: '2-user',
    iconStyle: 'light',
  },
  {
    label: 'Inventory',
    routerLink: 'inventory',
    iconName: 'folder',
    iconStyle: 'light',
  },
  {
    label: 'Support',
    routerLink: 'support',
    iconName: 'chat',
    iconStyle: 'light',
  },
  {
    label: 'Settings',
    routerLink: 'setting',
    iconName: 'setting',
    iconStyle: 'light',
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('text', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(300),
      ]),
      transition(
        '* => void',
        animate(
          300,
          style({
            opacity: 0,
          })
        )
      ),
    ]),
    trigger('linkIcon', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(250),
      ]),
      transition(
        '* => void',
        animate(
          250,
          style({
            opacity: 0,
          })
        )
      ),
    ]),
  ],
})
export class SidebarComponent {
  @HostBinding('class.minimized')
  public minimized: boolean = false;

  public links: MenuLink[] = menuLinks;

  private timer?: NodeJS.Timeout;

  constructor(private router: Router, public store: Store) {}

  public isActive(url: string | UrlTree): boolean {
    return this.router.isActive(url, {
      paths: 'subset',
      queryParams: 'exact',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  public toggleSidebar(): void {
    this.minimized = !this.minimized;
  }

  public toggleLink(index: number, state: boolean): void {
    const link = this.links[index];
    if (state) {
      this.timer = setTimeout(() => (link.hovered = true), 50);
    } else {
      clearTimeout(this.timer);
      link.hovered = false;
    }
  }

  public onLogout(): void {
    this.store.dispatch(authActions.logout());
  }
}
