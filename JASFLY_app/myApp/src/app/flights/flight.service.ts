import { Injectable, signal } from "@angular/core";
import { Flight } from "../interfaces/flight";
import { Pilot } from "../interfaces/pilot";
import { Helicopter } from "../interfaces/helicopter";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Settings } from '../app.setting';
@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private apiUrl = Settings.API_URL;
  loggedPilotID = signal<number | null>(null);
  constructor(private http: HttpClient) {

  }

  getHelicopters(): Observable<Helicopter[]> {
    const url = `${this.apiUrl}/helicopteros`;
    return this.http.get<Helicopter[]>(url);
  }

  getPilots(): Observable<Pilot[]> {
    const url = `${this.apiUrl}/pilotos`;
    return this.http.get<Pilot[]>(url);
  }

  getFlights(): Observable<Flight[]> {
    const url = `${this.apiUrl}/vuelos`;
    return this.http.get<Flight[]>(url);
  }

  getFlight(id: number): Observable<Flight> {
    const url = `${this.apiUrl}/vuelos/${id}`;
    return this.http.get<Flight>(url);
  }

  saveFlight(flight: Flight): Observable<Flight> {
    const url = `${this.apiUrl}/vuelos`;
    return this.http.post<Flight>(url, flight);
  }

  updateFlight(id: number, flight: Flight): Observable<Flight> {
    const url = `${this.apiUrl}/vuelos/${id}`;
    return this.http.put<Flight>(url, flight);
  }

}