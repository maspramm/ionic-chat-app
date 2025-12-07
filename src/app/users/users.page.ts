import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonItem, IonList, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/auth-service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonContent, IonLabel, IonItem, IonList, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton]
})
export class UsersPage implements OnInit {
  users: any[] = [];

  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.users = this.auth.getUsers();
  }

  edit(index: number) {
    const newUsername = prompt('Username baru:', this.users[index].username);
    const newPassword = prompt('Password baru:', this.users[index].password);
    if (newUsername && newPassword) {
      this.auth.updateUser(index, { username: newUsername, password: newPassword });
      this.users = this.auth.getUsers();
    }
  }

  delete(index: number) {
    this.auth.deleteUser(index);
    this.users = this.auth.getUsers();
  }
  ngOnInit() {
  }

}
