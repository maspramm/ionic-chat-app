import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
    {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'users',
    loadComponent: () => import('./users/users.page').then( m => m.UsersPage)
  },
];
