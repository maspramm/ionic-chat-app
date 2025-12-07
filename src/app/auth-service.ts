import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key = 'users';
  // ambil semua user dari local storage
  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }
   // simpan user baru
  addUser(user: { username: string, password: string }) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.key, JSON.stringify(users));
  }
  // update user
  updateUser(index: number, user: { username: string, password: string }) {
    const users = this.getUsers();
    users[index] = user;
    localStorage.setItem(this.key, JSON.stringify(users));
  }
  // hapus user
  deleteUser(index: number) {
    const users = this.getUsers();
    users.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(users));
  }
  // cek login
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    return users.some(user => user.username === username && user.password === password);
  }
}
