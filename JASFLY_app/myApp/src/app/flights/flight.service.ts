import { Injectable, signal } from "@angular/core";
import { Flight } from "../interfaces/flight";
import { Pilot } from "../interfaces/pilot";
import { Helicopter } from "../interfaces/helicopter";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from 'rxjs';
import { Settings } from '../app.setting';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = Settings.API_URL;

  // Estado global del piloto logueado
  loggedPilotID = signal<number | null>(null);
  pilotFoto = signal<string | null>(null);   // foto en Base64, compartida en toda la app
  pilotData = signal<Pilot | null>(null);    // datos completos del piloto logueado

  constructor(private http: HttpClient) {}

  // ── Helicopteros ─────────────────────────────────────────────
  getHelicopters(): Observable<Helicopter[]> {
    return this.http.get<Helicopter[]>(`${this.apiUrl}/helicopteros`);
  }

  // ── Pilotos ───────────────────────────────────────────────────
  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(`${this.apiUrl}/pilotos`);
  }

  getPilotById(id: number): Observable<Pilot> {
    return this.http.get<Pilot>(`${this.apiUrl}/pilotos/${id}`);
  }

  updatePilot(id: number, piloto: Partial<Pilot>): Observable<Pilot> {
    return this.http.put<Pilot>(`${this.apiUrl}/pilotos/${id}`, piloto);
  }

  loginPilot(numero_licencia: number | string, contrasena: string): Observable<Pilot> {
    return this.http.post<Pilot>(`${this.apiUrl}/pilotos/login`, { numero_licencia, contrasena }).pipe(
      tap((piloto) => {
        // Al hacer login guardamos los datos y la foto en los signals
        this.pilotData.set(piloto);
        this.pilotFoto.set(piloto.foto ?? null);
      })
    );
  }

  /**
   * Sube la foto de perfil al backend (Base64) y actualiza el signal local.
   */
  updatePilotPhoto(id: number, fotoBase64: string): Observable<{ message: string; foto: string }> {
    return this.http.put<{ message: string; foto: string }>(
      `${this.apiUrl}/pilotos/${id}/foto`,
      { foto: fotoBase64 }
    ).pipe(
      tap(() => {
        // Actualiza el signal para que todos los headers reflejen el cambio inmediatamente
        this.pilotFoto.set(fotoBase64);
      })
    );
  }

  // ── Vuelos ────────────────────────────────────────────────────
  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}/vuelos`);
  }

  getFlight(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/vuelos/${id}`);
  }

  saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${this.apiUrl}/vuelos`, flight);
  }

  updateFlight(id: number, flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/vuelos/${id}`, flight);
  }
}