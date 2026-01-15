import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

import { profileRoutes } from './router/routes';

const redirectToUnAuthorize: CanMatchFn = (route, segment) => {
  console.log(route, segment);
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/unauthorized'));
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then((m) => m.Home),
    title: 'ElmerGram ',
  },
  ...(profileRoutes as Routes),
  // {
  //   path: 'posts',
  //   loadComponent: () =>
  //     import('./shared/not-found-component/not-found-component').then((m) => m.NotFoundComponent),
  //   canActivate: [testCanMatch],
  // },
  {
    path: '**',
    canActivate: [redirectToUnAuthorize],
    title: 'ElmerGram',
    loadComponent: () =>
      import('./shared/not-found-component/not-found-component').then((m) => m.NotFoundComponent),
  },
];
