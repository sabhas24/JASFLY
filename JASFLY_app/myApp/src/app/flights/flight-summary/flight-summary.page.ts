import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonLabel, IonButton, IonIcon, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { FlightService } from '../flight.service';
import { Flight } from '../../interfaces/flight';
import { Helicopter } from '../../interfaces/helicopter';
import { Pilot } from '../../interfaces/pilot';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, airplane } from 'ionicons/icons';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.page.html',
  styleUrls: ['./flight-summary.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader,
    IonButton, IonBackButton, IonButtons,
    CommonModule, FormsModule
  ]
})
export class FlightSummaryPage implements OnInit {
  flight: Flight | null = null;
  helicopters: Helicopter[] = [];
  pilots: Pilot[] = [];
  flightId: number | null = null;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    addIcons({ chevronBackOutline, airplane });
  }

  ngOnInit() {
    this.loadInitialData();
    this.flightId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.flightId) {
      this.loadFlight(this.flightId);
    }
  }

  async loadInitialData() {
    try {
      this.helicopters = await this.flightService.getHelicopters().toPromise() || [];
      this.pilots = await this.flightService.getPilots().toPromise() || [];
    } catch (err) {
      console.error('Error loading initial data', err);
    }
  }

  loadFlight(id: number) {
    this.flightService.getFlight(id).subscribe({
      next: (data) => {
        this.flight = data;
      },
      error: (err) => console.error('Error loading flight', err)
    });
  }

  calculateHours(): string {
    if (!this.flight || !this.flight.horaInicio || !this.flight.horaFin) return '0.0';
    const start = this.timeToMinutes(this.flight.horaInicio);
    const end = this.timeToMinutes(this.flight.horaFin);
    const diff = end - start;
    return (diff / 60).toFixed(1);
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  getHelicopterModel(id: number): string {
    const heli = this.helicopters.find(h => h.id === id);
    return heli ? `Helicóptero ${heli.id}` : '';
  }

  getPilotName(id: number): string {
    const pilot = this.pilots.find(p => p.id === id);
    return pilot ? `Cpt. ${pilot.Nombre || pilot.nombre} ${pilot.apellido}` : '';
  }

  edit() {
    if (this.flight) {
      this.router.navigate(['/flight-form', this.flight.id]);
    }
  }

  confirmar() {
    this.router.navigate(['/flight-list']);
  }
}
