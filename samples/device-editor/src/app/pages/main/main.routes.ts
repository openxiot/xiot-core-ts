import { Routes } from '@angular/router';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/main/welcome'
  },
  {
    path: 'welcome',
    data: { breadcrumb: '首页' },
    loadChildren: () => import('./welcome/welcome.routes').then(m => m.WELCOME_ROUTES)
  }
];
