import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth-guard';

export const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
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

];
