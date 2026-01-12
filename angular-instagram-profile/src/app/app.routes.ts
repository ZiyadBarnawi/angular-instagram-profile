import { Routes } from '@angular/router';
import { Profile } from './profile/profile-component/profile.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home.component').then((m) => m.Home),
  },
  {
    path: 'profile',
    pathMatch: 'prefix',
    loadComponent: () =>
      import('./profile/profile-component/profile.component').then((m) => m.Profile),
    children: [
      {
        path: 'signup',
        pathMatch: 'prefix',
        loadComponent: () =>
          import(
            '././profile/profile-signup-dialog-component/profile-signup-dialog-component'
          ).then((m) => m.ProfileSignupDialogComponent),
      },
    ],
  },
  {
    path: 'profile/:username',
    pathMatch: 'prefix',
    // component:Profile, //TIP: eagerly loaded component: loaded immediately
    loadComponent: () =>
      import('./profile/profile-component/profile.component').then((m) => m.Profile), // TIP: Lazy loaded: loaded when needed
    loadChildren: (): Routes => [
      {
        path: 'edit',
        pathMatch: 'prefix',
        loadComponent: () =>
          import('././profile/profile-edit-dialog-component/profile-edit-dialog-component').then(
            (m) => m.ProfileEditDialogComponent
          ),
      },
      {
        path: 'signup',
        pathMatch: 'prefix',
        loadComponent: () =>
          import(
            '././profile/profile-signup-dialog-component/profile-signup-dialog-component'
          ).then((m) => m.ProfileSignupDialogComponent),
      },
      {
        path: 'delete',
        pathMatch: 'prefix',
        loadComponent: () =>
          import(
            '././profile/profile-delete-dialog-component/profile-delete-dialog-component'
          ).then((m) => m.ProfileDeleteDialogComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found-component/not-found-component').then((m) => m.NotFoundComponent),
  },
];
