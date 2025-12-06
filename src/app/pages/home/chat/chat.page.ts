import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonTextarea, IonIcon, IonButton, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonFabButton, IonSpinner, IonFooter, IonItem, IonItemGroup, IonList } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBack, send } from 'ionicons/icons';
import { ChatBoxComponent } from 'src/app/components/chat-box/chat-box.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [IonList, IonItemGroup, IonSpinner, 
    IonButtons, IonTextarea, IonBackButton,
    IonIcon, IonButton, IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule,
    IonFabButton, IonFooter, ChatBoxComponent]
})
export class ChatPage implements OnInit {
  userId: string = 'Sender';
  message: string;
  isLoading= false;
  currentUserId = 1;
  chats = [
    {id: 1, sender: 1, message: 'hi'},
    {id: 2, sender: 2, message: 'hi there!'},
  ];

  

  constructor(private route: ActivatedRoute) { 
    addIcons({ send, chevronBack });
    this.userId = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit() {
  }
  sendMessage() {
    
  }

}
