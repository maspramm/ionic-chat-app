import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonRouterLink, IonButton, IonToolbar, IonTitle, IonContent, IonInput } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonButton, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonInput,
    RouterLink,
    IonRouterLink,
  ],
})
export class HomePage {
  username : string = '';
  password : string = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}
  login() {
    if (this.auth.login(this.username, this.password)) {
      localStorage.setItem('currentUser', this.username);
      this.router.navigate(['/welcome']);
    } else {
      this.error = 'Username atau password salah!';
    }
  }
}
