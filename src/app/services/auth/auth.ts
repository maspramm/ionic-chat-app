import { ApiService } from './../api/api';
import { Injectable } from '@angular/core';
import { Auth, getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, User,
  onAuthStateChanged,
  authState} from '@angular/fire/auth';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _uid = new BehaviorSubject<string | null>(null);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public user$: Observable<User | null> = this.currentUserSubject.asObservable();
  public uid$: Observable<string | null> = this._uid.asObservable();

  constructor(
    private fireAuth: Auth,
    private apiService: ApiService
  ){
    onAuthStateChanged(this.fireAuth, (user) => {
      console.log('Auth state changed:', user?.uid);
      this.currentUserSubject.next(user);
      
      if (user) {
        this._uid.next(user.uid);
        this.setUserData(user.uid);
      } else {
        this._uid.next(null);
      }
    });
  }
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(this.fireAuth, email, password);
      console.log('Login response:', response);
      if (response.user) {
        this.setUserData(response.user.uid);
      }
      return response;
    } catch(e) {
      throw(e);
    }
  }

  getId(): string | null {
    return this._uid.getValue();
  }

  async getIdAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      const currentUid = this._uid.getValue();
      if (currentUid) {
        resolve(currentUid);
        return;
      }
      const unsubscribe = onAuthStateChanged(this.fireAuth, (user) => {
        unsubscribe(); 
        if (user?.uid) {
          resolve(user.uid);
        } else {
          reject(new Error('No user logged in'));
        }
      });
    });
  }

  getIdObservable(): Observable<string | null> {
    return this._uid.asObservable();
  }

  setUserData(uid: string) {
    this._uid.next(uid);
  }

  randomIntFromInterval(min: number, max: number): number { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  async register(formValue: any): Promise<any> {
    try{
      const response = await createUserWithEmailAndPassword(
        this.fireAuth, 
        formValue.email, 
        formValue.password
      );
      console.log('Registered user: ', response);
      const data = {
        email: formValue.email,
        name:formValue.name,
        uid: response.user.uid,
        avatar: 'avatar-'+ this.randomIntFromInterval(200, 400) +'.png'
      };
      await this.apiService.setDocument(`users/${response.user.uid}`, data);
      const userData = {
        id: response.user.uid
      };
      return userData;
    } catch(e) {
      throw(e);
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.fireAuth, email);
      return true;
    } catch (e) {
      throw(e);
    }
  }

  async logout(): Promise<boolean> {
    try {
      await this.fireAuth.signOut();
      this._uid.next(null);
      this.currentUserSubject.next(null);
      return true
    } catch (e) {
      throw(e);
    }
  }
  checkAuth(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(this.fireAuth, (user) => {
        unsubscribe();
        console.log('auth user: ', user);
        resolve(user);
      }, reject);
    });
  }

  async getCurrentUser(id) {
    const docSnap: any = await this.apiService.getDocById(`users/${id}`);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('No such document exists');
    }
  }

  // NEW: Get current user observable
  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  // NEW: Get current user promise
  async getCurrentUserPromise(): Promise<User | null> {
    return this.fireAuth.currentUser;
  }

  // NEW: Wait for auth to be ready
  waitForAuth(): Promise<User | null> {
    return new Promise((resolve) => {
      if (this.fireAuth.currentUser) {
        resolve(this.fireAuth.currentUser);
      } else {
        const unsubscribe = onAuthStateChanged(this.fireAuth, (user) => {
          unsubscribe();
          resolve(user);
        });
      }
    });
  }

}
