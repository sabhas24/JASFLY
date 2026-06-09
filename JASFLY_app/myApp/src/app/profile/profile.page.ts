import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonButton, IonIcon,
  IonInput, IonTabBar, IonTabButton, IonLabel,
  ToastController
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  menuOutline, personOutline, pencilOutline, checkmarkCircleOutline,
  idCardOutline, shieldCheckmarkOutline, calendarOutline, airplaneOutline,
  saveOutline, sunnyOutline, warningOutline
} from 'ionicons/icons';
import { FlightService } from '../flights/flight.service';
import { Pilot } from '../interfaces/pilot';
import { MenuController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonButton, IonIcon,
    IonInput, IonTabBar, IonTabButton, IonLabel,
    CommonModule, FormsModule, RouterModule
  ]
})
export class ProfilePage implements OnInit {

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  piloto: Pilot = {
    id: 0,
    nombre: '',
    Nombre: '',
    apellido: '',
    tipo_licencia: '',
    numero_licencia: ''
  };

  email: string = '';
  telefono: string = '';
  fechaVencimiento: string = '';

  private flightService = inject(FlightService);
  private menuCtrl = inject(MenuController);
  private toastCtrl = inject(ToastController);

  // Signal reactivo: la foto se comparte con toda la app desde el servicio
  pilotFoto = this.flightService.pilotFoto;

  constructor() {
    addIcons({
      menuOutline, personOutline, pencilOutline, checkmarkCircleOutline,
      idCardOutline, shieldCheckmarkOutline, calendarOutline, airplaneOutline,
      saveOutline, sunnyOutline, warningOutline
    });
  }

  ngOnInit() {
    this.cargarPiloto();
  }

  cargarPiloto() {
    // Primero usamos el dato cacheado del login (más rápido, sin llamada extra)
    const cached = this.flightService.pilotData();
    if (cached) {
      this.piloto = cached;
      if (cached.foto) this.flightService.pilotFoto.set(cached.foto);
      return;
    }

    // Si no hay caché (ej: recarga de página), lo pedimos al backend
    const pilotId = this.flightService.loggedPilotID();
    if (pilotId) {
      this.flightService.getPilotById(pilotId).subscribe({
        next: (piloto) => {
          this.piloto = piloto;
          this.flightService.pilotData.set(piloto);
          if (piloto.foto) this.flightService.pilotFoto.set(piloto.foto);
        },
        error: (err) => console.error('Error al cargar piloto:', err)
      });
    }
  }

  /**
   * Abre el selector de archivos del sistema al hacer clic en el avatar.
   */
  seleccionarFoto() {
    this.fileInputRef.nativeElement.click();
  }

  /**
   * Se dispara cuando el usuario elige una imagen.
   * Convierte la imagen a Base64 y la sube al backend.
   */
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      const pilotId = this.flightService.loggedPilotID();

      if (!pilotId) return;

      this.flightService.updatePilotPhoto(pilotId, base64).subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Foto de perfil actualizada',
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          toast.present();
        },
        error: async (err) => {
          console.error('Error al subir foto:', err);
          const toast = await this.toastCtrl.create({
            message: 'Error al actualizar la foto',
            duration: 2000,
            color: 'danger',
            position: 'top'
          });
          toast.present();
        }
      });
    };

    reader.readAsDataURL(file);
  }

  guardarPerfil() {
    const pilotId = this.flightService.loggedPilotID();
    if (!pilotId) return;

    this.flightService.updatePilot(pilotId, {
      Nombre: this.piloto.Nombre,
      apellido: this.piloto.apellido,
      tipo_licencia: this.piloto.tipo_licencia,
      numero_licencia: this.piloto.numero_licencia
    }).subscribe({
      next: async (pilotoActualizado) => {
        this.flightService.pilotData.set(pilotoActualizado);
        const toast = await this.toastCtrl.create({
          message: 'Perfil guardado correctamente',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
      },
      error: async (err) => {
        console.error('Error al guardar perfil:', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al guardar los cambios',
          duration: 2500,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    });
  }

  openMenu() {
    this.menuCtrl.open();
  }
}
