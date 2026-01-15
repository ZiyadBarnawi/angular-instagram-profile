import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { resolveTitle, resolveRouteData } from '../profile/profile-component/profile.component';
import { inject } from '@angular/core';

export const profileRoutes: Routes = [
  {
    path: 'profile', // http://localhost:4200/profile
    pathMatch: 'full',
    redirectTo: 'profile/Ziyad',
  },
  {
    path: 'profile/:username',
    pathMatch: 'prefix',
    // component:ProfileComponent , //TIP: eagerly loaded component: loaded immediately
    loadComponent: () =>
      import('./../profile/profile-component/profile.component').then((m) => m.ProfileComponent),
    // TIP: Lazy loaded: loaded when needed
    title: resolveTitle,
    data: { text: "I'm a static route text!✨" },
    runGuardsAndResolvers: 'always',

    resolve: {
      text: resolveRouteData,
    }, //TIP: it appears that on conflict, resolve value will take precedence
    loadChildren: (): Routes => [
      {
        path: 'edit',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('./../profile/profile-edit-dialog-component/profile-edit-dialog-component').then(
            (m) => m.ProfileEditDialogComponent
          ),
      },
      {
        path: 'signup',
        pathMatch: 'prefix',
        loadComponent: () =>
          import(
            './../profile/profile-signup-dialog-component/profile-signup-dialog-component'
          ).then((m) => m.ProfileSignupDialogComponent),
      },
      {
        path: 'delete',
        pathMatch: 'prefix',
        loadComponent: () =>
          import(
            './../profile/profile-delete-dialog-component/profile-delete-dialog-component'
          ).then((m) => m.ProfileDeleteDialogComponent),
      },
    ],
  },
];
