import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonItem, IonSelect, IonSelectOption, IonInput, AlertController } from '@ionic/angular/standalone';
import { FlightService } from '../flights/flight.service';
import { Pilot } from '../interfaces/pilot';
import { addIcons } from 'ionicons';
import { airplane, fingerPrintOutline } from 'ionicons/icons';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, IonItem, IonSelect, IonSelectOption, IonInput, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  pilots: Pilot[] = [];
  selectedPilotId: number | null = null;
  password = '';
  
  // Estados para controlar biometría
  biometriaActivadaParaPiloto = false;

  constructor(
    private router: Router,
    private flightService: FlightService,
    private alertController: AlertController
  ) {
    addIcons({ airplane, fingerPrintOutline });
  }

  ngOnInit() {
    this.flightService.getPilots().subscribe({
      next: (data) => this.pilots = data,
      error: (err) => console.error("Error cargando pilotos", err)
    });
  }

  async verificarBiometriaDisponible() {
    if (!this.selectedPilotId) {
      this.biometriaActivadaParaPiloto = false;
      return;
    }

    try {
      const isAvailable = await NativeBiometric.isAvailable();
      if (!isAvailable.isAvailable) {
        this.biometriaActivadaParaPiloto = false;
        return;
      }

      const key = `jasfly_pilot_${this.selectedPilotId}`;
      const credentials = await NativeBiometric.getCredentials({
        server: key
      }).catch(() => null);

      this.biometriaActivadaParaPiloto = credentials !== null;
    } catch (e) {
      this.biometriaActivadaParaPiloto = false;
    }
  }

  ingresar() {
    if (!this.selectedPilotId) {
      alert("Por favor seleccione su nombre de la lista para continuar.");
      return;
    }
    if (!this.password) {
      alert("Por favor ingrese su contraseña.");
      return;
    }

    const pilot = this.pilots.find(p => p.id === this.selectedPilotId);
    if (!pilot) return;

    this.flightService.loginPilot(pilot.numero_licencia, this.password).subscribe({
      next: (res) => {
        this.flightService.loggedPilotID.set(this.selectedPilotId);
        this.ofrecerActivarBiometria();
        this.router.navigate(['/flight-list']);
      },
      error: (err) => {
        console.error("Error al autenticar:", err);
        alert("Error al iniciar sesión. Verifique su contraseña.");
      }
    });
  }

  async ofrecerActivarBiometria() {
    try {
      const isAvailable = await NativeBiometric.isAvailable();
      if (!isAvailable.isAvailable) return;

      if (this.biometriaActivadaParaPiloto) return;

      const alert = await this.alertController.create({
        header: 'Inicio con Huella',
        message: '¿Deseas habilitar el inicio de sesión con huella dactilar para tu próximo ingreso?',
        buttons: [
          { text: 'Ahora no', role: 'cancel' },
          {
            text: 'Activar',
            handler: async () => {
              const key = `jasfly_pilot_${this.selectedPilotId}`;
              await NativeBiometric.setCredentials({
                server: key,
                username: this.selectedPilotId!.toString(),
                password: this.password
              });
              alert.dismiss();
            }
          }
        ]
      });
      await alert.present();
    } catch (e) {
      console.warn("La biometría no se pudo configurar o no está soportada.", e);
    }
  }

  async autenticarConHuella() {
    if (!this.selectedPilotId) return;
    const pilot = this.pilots.find(p => p.id === this.selectedPilotId);
    if (!pilot) return;

    const key = `jasfly_pilot_${this.selectedPilotId}`;

    try {
      // 1. Mostrar diálogo nativo para autenticar
      await NativeBiometric.verifyIdentity({
        reason: 'Posa tu huella dactilar para ingresar',
        title: 'Inicio de sesión JASFLY',
        subtitle: 'Autenticación requerida',
        description: 'Usaremos la biometría para validar tu acceso'
      });

      // 2. Si es exitoso, obtenemos la contraseña
      const credentials = await NativeBiometric.getCredentials({
        server: key
      });

      if (credentials && credentials.password) {
        this.password = credentials.password;
        
        this.flightService.loginPilot(pilot.numero_licencia, this.password).subscribe({
          next: (res) => {
            this.flightService.loggedPilotID.set(this.selectedPilotId);
            this.router.navigate(['/flight-list']);
          },
          error: (err) => {
            alert("Error al validar las credenciales almacenadas.");
          }
        });
      }
    } catch (error) {
      console.error("Autenticación biométrica cancelada o fallida", error);
    }
  }
}
