import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonIcon, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { FlightService } from '../flight.service';
import { Flight } from '../../interfaces/flight';
import { Helicopter } from '../../interfaces/helicopter';
import { Pilot } from '../../interfaces/pilot';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, syncOutline, addOutline, airplane } from 'ionicons/icons';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.page.html',
  styleUrls: ['./flight-list.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, 
    IonButton, IonIcon, IonCard, IonCardContent, CommonModule, FormsModule, RouterModule
  ]
})
export class FlightListPage implements OnInit {
  flights: Flight[] = [];
  helicopters: Helicopter[] = [];
  pilots: Pilot[] = [];

  constructor(
    private flightService: FlightService,
    private router: Router
  ) {
    addIcons({ chevronForwardOutline, syncOutline, addOutline, airplane });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  ionViewWillEnter() {
    this.loadInitialData();
  }

  async loadInitialData() {
    try {
      this.helicopters = await this.flightService.getHelicopters().toPromise() || [];
      this.pilots = await this.flightService.getPilots().toPromise() || [];
      this.loadFlights();
    } catch (err) {
      console.error('Error loading initial data', err);
    }
  }

  loadFlights() {
    this.flightService.getFlights().subscribe({
      next: (data) => {
        this.flights = data;
      },
      error: (err) => console.error('Error loading flights', err)
    });
  }

  getHelicopterName(id: number): string {
    const heli = this.helicopters.find(h => h.id === id);
    return heli ? `Helicóptero ${heli.id}` : `Heli ${id}`;
  }

  getPilotName(id: number): string {
    const pilot = this.pilots.find(p => p.id === id);
    return pilot ? `Cpt. ${pilot.nombre.substring(0, 1)}. ${pilot.apellido}` : `Piloto ${id}`;
  }

  newRegister() {
    this.router.navigate(['/flight-form']);
  }

  synchronize() {
    this.loadInitialData();
  }
}
