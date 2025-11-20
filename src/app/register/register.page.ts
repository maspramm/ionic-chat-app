import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonButton, IonInput, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonButton, IonInput, IonTitle, IonToolbar, CommonModule, FormsModule]
})

export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    if (!this.username || !this.password) {
      this.error ='Username dan password wajib diisi!';
      return;
    }

    const users = this.auth.getUsers();
    if (users.some(u => u.username === this.username)) {
      this.error = 'Username sudah terdaftar!';
      return;
    }

    this.auth.addUser({ username: this.username, password: this.password });
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
