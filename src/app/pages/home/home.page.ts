import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle,
  IonToolbar, IonButtons, IonButton, 
  IonIcon, IonPopover, IonLabel, IonSpinner,
  IonSegmentButton, IonSegment, IonListHeader, 
  IonAvatar, IonFab, IonFabButton, IonList,
  IonModal, IonItem  } from '@ionic/angular/standalone';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { NavigationExtras, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat/chat';
import { AuthService } from 'src/app/services/auth/auth'; 
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonModal, IonFabButton, 
    IonSegmentButton, IonPopover, IonList,
    IonIcon, IonButton, IonContent,
    IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButtons,
    IonLabel, IonSegment, IonListHeader, 
    IonAvatar, IonFab, UserListComponent,
    IonSpinner,]
})
export class HomePage implements OnInit {
  @ViewChild('new_chat') modal: IonModal;
  @ViewChild('popover') popover: IonPopover;
  segment: string = 'chats';
  open_new_chat = false;
  users: Observable<any[]>;
  chatRooms: Observable<any[]> = of([]);
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  async ngOnInit() { 
    console.log('HomePage: Initializing...');
    
    try {
      const user = await this.authService.waitForAuth();
      console.log('HomePage: User auth ready', user?.uid);
      
      if (user) {
        this.getRooms();
      } else {
        console.warn('HomePage: No user logged in');
        this.router.navigate(['/login']);
      };

    } catch (error) {
      console.error('HomePage: Auth error', error);
      this.router.navigate(['/login']);
    } finally {
      this.isLoading = false;
    }
  }


  getRooms() {
    console.log('HomePage: Getting rooms...');
    this.isLoading = true;
    
    this.chatService.getChatRooms();
    this.chatRooms = this.chatService.chatRooms || of([]);
    
    this.chatRooms.subscribe({
      next: (rooms) => {
        console.log('HomePage: Rooms loaded:', rooms);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('HomePage: Error loading rooms:', err);
        this.isLoading = false;
      }
    });
  }

  async logout() { 
    try {
      console.log('logout');
      await this.popover?.dismiss();
      await this.authService.logout(); // ← PAKAI authService, BUKAN chatService.auth
      this.router.navigate(['/login'], { replaceUrl: true });
    } catch(err) {
      console.log(err);
    }
  }

  getRandomAvatar() {
    return 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70 + 1);
  }
  onSegmentChanged(event: any) {
    console.log('Segment changed:', event.detail?.value);
    this.segment = event.detail?.value || 'chats';
  }

  newChat() { 
    this.open_new_chat = true;
    if(!this.users) this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers();
    this.users = this.chatService.users || of([]);
  }

  didDismiss(event: any) {
    this.open_new_chat = false;
    console.log('Modal closed', event);
  }

  cancel() {
    this.modal?.dismiss();
    this.open_new_chat = false;
  }
  async startChat(item) {
    try {
      const room = await this.chatService.createChatRoom(item?.uid);
      console.log('room: ', room);
      this.cancel();
      const navData : NavigationExtras = {
        queryParams: {
          name: item?.name
        }
      };
      this.router.navigate(['/', 'home', 'chats', room?.id], navData);
    } catch (error) {
      console.log(error);
    }
  }
  getChat(item: any) {
    this.router.navigate(['/chat', item?.id]);
  }

  getUser(user: any) {
    return user;
  }

  trackById(index: number, item: any) {
    return item?.id || index;
  }
}
