import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth';
import { map, Observable, of, switchMap, filter, take } from 'rxjs';
import { ApiService } from '../api/api';
import { user } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  currentUserId: string;
  public users: Observable<any>;
  public chatRooms: Observable<any>;

  constructor(
    public auth: AuthService,
    public api: ApiService
  ) {
    this.initUserId();
  }

  private initUserId() {
    this.auth.uid$.subscribe(uid => {
      if (uid) {
        this.currentUserId = uid;
        console.log('ChatService: User ID set to', uid);
      }
    });
  }

  getCurrentUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.currentUserId) {
        resolve(this.currentUserId);
      } else {
        this.auth.uid$
          .pipe(
            filter(uid=> !!uid),
            take(1)
          )
          .subscribe({
            next: (uid) => {
              this.currentUserId = uid;
              resolve(this.currentUserId);
            },
            error: (err) => reject(err),
            complete: () => {
              if (!this.currentUserId) {
                reject(new Error('No user ID available'));
              }
            }
          });
      }
    });
  }

  getUsers() {
    this.getCurrentUserId().then(userId => {
      this.users = this.api.collectionDataQuery(
        'users',
        this.api.whereQuery('uid', '!=', userId)
      );
    }).catch(err => {
      console.error('Cannot get users:', err);
      this.users = of([]);
    });
  }

  async createChatRoom(user_id: string) {
    try {
      const currentUserId = await this.getCurrentUserId();
      let room: any;
      const querySnapshot = await this.api.getDocs(
        'chatRooms',
        this.api.whereQuery(
          'members',
          'in',
          [[user_id, currentUserId], [currentUserId, user_id]]
        )
      );
      room = querySnapshot.docs.map((doc: any) => {
        let item = doc.data();
        item.id = doc.id;
        return item;
      });
      console.log('exist docs: ', room);
      if (room?.length > 0) return room[0];
      const data = {
        members: [currentUserId, user_id],
        type: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      room = await this.api.addDocument('chatRooms', data);
      return room;
    } catch (error) {
      throw error;
    }
  }

  getChatRooms() {
    // Pakai promise untuk wait user ID
    this.getCurrentUserId()
      .then(userId => {
        this.chatRooms = this.api.collectionDataQuery(
          'chatRooms',
          this.api.whereQuery('members', 'array-contains', userId)
        ).pipe(
          map((data: any[]) => {
            console.log('room data: ', data);
            
            if (!data || data.length === 0) {
              return [];
            }
            
            // Process each chat room
            return data.map((element) => {
              const user_data = element.members.filter((x: string) => x !== userId);
              
              if (user_data.length > 0) {
                const user = this.api.docDataQuery(`users/${user_data[0]}`, true);
                element.user = user;
              }
              
              return element;
            });
          })
        );
      })
      .catch(err => {
        console.error('Cannot get chat rooms:', err);
        this.chatRooms = of([]);
      });
  }
  async loadChatRooms(): Promise<Observable<any>> {
    await this.getCurrentUserId(); // Wait for user ID
    this.getChatRooms();
    return this.chatRooms;
  }

}