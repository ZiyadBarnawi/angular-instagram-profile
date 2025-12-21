import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./home/home').then((m) => m.Home) },
  {
    path: ':username',
    pathMatch: 'prefix',
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
  },
];
