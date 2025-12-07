import { Routes } from '@angular/router';
<<<<<<< HEAD
import { AuthGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
=======

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
>>>>>>> origin/master
    pathMatch: 'full',
  },
  {
    path: 'home',
<<<<<<< HEAD
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canLoad: [AuthGuard]
  },
  {
    path: 'chat/:id',
    loadComponent: () =>
      import('./pages/home/chat/chat.page').then(m => m.ChatPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: '**',
    redirectTo: 'home'
  }

=======
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
>>>>>>> origin/master
];
