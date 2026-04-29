import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonItem, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { FlightService } from '../flights/flight.service';
import { Pilot } from '../interfaces/pilot';
import { addIcons } from 'ionicons';
import { airplane } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonItem, IonSelect, IonSelectOption, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  pilots: Pilot[] = [];
  selectedPilotId: number | null = null;

  constructor(
    private router: Router,
    private flightService: FlightService
  ) {
    addIcons({ airplane });
  }

  ngOnInit() {

    this.flightService.getPilots().subscribe({
      next: (data) => this.pilots = data,
      error: (err) => console.error("Error cargando pilotos", err)
    });
  }

  ingresar() {
    if (this.selectedPilotId) {
      this.flightService.loggedPilotID.set(this.selectedPilotId);
      this.router.navigate(['/flight-list']);
    } else {
      alert("Por favor seleccione su nombre de la lista para continuar.");
    }
  }
}
