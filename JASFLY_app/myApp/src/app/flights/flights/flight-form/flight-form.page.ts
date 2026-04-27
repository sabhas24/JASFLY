import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { FlightService } from '../../flight.service';
import { Flight } from '../../../interfaces/flight';
import { Helicopter } from '../../../interfaces/helicopter';
import { Pilot } from '../../../interfaces/pilot';
import { ActivatedRoute, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, airplane } from 'ionicons/icons';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.page.html',
  styleUrls: ['./flight-form.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, 
    IonSelect, IonSelectOption, IonInput, IonButton, IonIcon, IonBackButton, IonButtons,
    CommonModule, FormsModule
  ]
})
export class FlightFormPage implements OnInit {
  mode: 'new' | 'summary' | 'edit' = 'new';
  flight: Flight = {
    id: 0,
    pilotId: 0,
    aircraftId: 0,
    fecha: new Date(),
    origen: '',
    destino: '',
    horaInicio: '',
    horaFin: '',
    odometroInicio: 0,
    odometroFin: 0,
    puestaEnMarcha: 0,
    tirosDeAgua: 0
  };

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
      this.mode = 'summary';
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

  iniciarActividad() {
    this.flight.horaInicio = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  finalizarActividad() {
    this.flight.horaFin = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  guardar() {
    if (this.mode === 'new') {
      this.flightService.saveFlight(this.flight).subscribe({
        next: () => this.router.navigate(['/flight-list']),
        error: (err) => console.error('Error saving flight', err)
      });
    } else {
      this.flightService.updateFlight(this.flight.id, this.flight).subscribe({
        next: () => this.mode = 'summary',
        error: (err) => console.error('Error updating flight', err)
      });
    }
  }

  edit() {
    this.mode = 'edit';
  }

  confirmar() {
    this.router.navigate(['/flight-list']);
  }

  calculateHours(): string {
    if (!this.flight.horaInicio || !this.flight.horaFin) return '0.0';
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
    return pilot ? `Cpt. ${pilot.nombre} ${pilot.apellido}` : '';
  }
}
