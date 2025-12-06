import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { addIcons } from 'ionicons';
import { 
  lockClosed,   
  mailOutline,     
  keyOutline,       
  eyeOutline,       
  ellipsisVertical, 
  add,              
  personCircle,
  chatbubbleEllipses,
  send,
  camera,
  image,
  document,
  mic,
  happy
} from 'ionicons/icons';

addIcons({
  lockClosed,
  mailOutline, 
  keyOutline,
  eyeOutline,
  ellipsisVertical,
  add,
  personCircle,
  chatbubbleEllipses,
  send,
  camera, 
  image,
  document,
  mic,
  happy
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
});
