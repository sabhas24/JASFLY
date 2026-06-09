import { Component } from '@angular/core';
import {
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline, documentTextOutline, personOutline, partlySunnyOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar,
    IonContent, IonList, IonItem, IonIcon, IonLabel, IonMenuToggle,
    RouterModule
  ],
})
export class AppComponent {
  constructor() {
    addIcons({ airplaneOutline, documentTextOutline, personOutline, partlySunnyOutline });
  }

  mockAction(item: string) {
    alert(`Sección "${item}" en desarrollo (MOCK)`);
  }
}
