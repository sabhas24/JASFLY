import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonItem, IonLabel, IonButton, IonIcon, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../../interfaces/flight';
import { Helicopter } from '../../interfaces/helicopter';
import { Pilot } from '../../interfaces/pilot';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, syncOutline, addOutline, airplane, sunnyOutline, warningOutline, personCircleOutline, personOutline, menuOutline } from 'ionicons/icons';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.page.html',
  styleUrls: ['./flight-list.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonList, IonItem, IonLabel,
    IonButton, IonIcon, IonTabBar, IonTabButton,
    CommonModule, FormsModule, RouterModule
  ]
})
export class FlightListPage implements OnInit {
  flights: Flight[] = [];
  currentPilotId: number | null = null;
  pilotFoto = this.flightService.pilotFoto; // Signal reactivo con la foto
  private menuCtrl = inject(MenuController);

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {
    addIcons({ chevronForwardOutline, syncOutline, addOutline, airplane, sunnyOutline, warningOutline, personCircleOutline, personOutline, menuOutline });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  ionViewWillEnter() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.currentPilotId = this.flightService.loggedPilotID();
    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getFlights().subscribe({
      next: (data) => {
        if (this.currentPilotId) {
          this.flights = data.filter(flight => flight.pilotoId === this.currentPilotId);
        } else {
          this.flights = data;
        }
      },
      error: (err) => console.error('Error loading flights', err)
    });
  }

  newRegister() {
    this.router.navigate(['/flight-form']);
  }

  synchronize() {
    this.loadInitialData();
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
