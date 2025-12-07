import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`,
=======
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
>>>>>>> origin/master
})
export class AppComponent {
  constructor() {}
}
