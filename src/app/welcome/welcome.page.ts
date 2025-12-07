import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRouterLink, IonButton, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [IonContent, IonRouterLink, RouterLink, IonButton, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class WelcomePage implements OnInit {
  currentUser = localStorage.getItem('currentUser');

  constructor(private auth: ActivatedRoute, private router: Router) {}

  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }
  keUsers() {
    this.router.navigate(['/users']);
  }

  ngOnInit() {
  }

}
