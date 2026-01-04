import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: ':username',
    pathMatch: 'prefix',
    loadComponent: () => import('./profile/profile.component').then((m) => m.ProfileComponent),
  },
];
