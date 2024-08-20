import { Routes } from '@angular/router';
import { ROUTE_DATA_BREADCRUMB } from './core/constants/routing';
import { viewItemResolver } from './features/inventory/pages/view-item/view-item-resolver';
import { authGuard } from './core/auth/guards/auth.guard';
import { loginGuard } from './core/auth/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () =>
      import('./core/auth/pages/login/login.page.component').then(
        (c) => c.LoginPageComponent
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './features/dashboard/pages/dashboard/dashboard.page.component'
          ).then((c) => c.DashboardPageComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/pages/orders/orders.page.component').then(
            (c) => c.OrdersPageComponent
          ),
        data: {
          [ROUTE_DATA_BREADCRUMB]: 'Orders',
        },
      },
      {
        path: 'customers',
        loadComponent: () =>
          import(
            './features/customers/pages/customers/customers.page.component'
          ).then((c) => c.CustomersPageComponent),
        data: {
          [ROUTE_DATA_BREADCRUMB]: 'Customers',
        },
      },
      {
        path: 'inventory',
        children: [
          {
            path: '',
            loadComponent: () =>
              import(
                './features/inventory/pages/inventory/inventory.page.component'
              ).then((c) => c.InventoryPageComponent),
            data: {
              [ROUTE_DATA_BREADCRUMB]: null,
            },
          },
          {
            path: 'new-item',
            loadComponent: () =>
              import(
                './features/inventory/pages/new-item/new-item.component'
              ).then((c) => c.NewItemComponent),
            data: {
              [ROUTE_DATA_BREADCRUMB]: 'New Item',
            },
          },
          {
            path: 'item/:id',
            loadComponent: () =>
              import(
                './features/inventory/pages/view-item/view-item.component'
              ).then((c) => c.ViewItemComponent),
            data: {
              [ROUTE_DATA_BREADCRUMB]: 'View Item',
            },
            resolve: { item: viewItemResolver },
          },
        ],
        data: {
          [ROUTE_DATA_BREADCRUMB]: 'Inventory',
        },
      },
    ],
  },
];
