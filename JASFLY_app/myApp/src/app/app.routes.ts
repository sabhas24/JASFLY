import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'flight-list',
    pathMatch: 'full'
  },
  {
    path: 'flight-list',
    loadComponent: () => import('./flights/flight-list/flight-list.page').then( m => m.FlightListPage)
  },
  {
    path: 'flight-form',
    loadComponent: () => import('./flights/flights/flight-form/flight-form.page').then( m => m.FlightFormPage)
  },
  {
    path: 'flight-form/:id',
    loadComponent: () => import('./flights/flights/flight-form/flight-form.page').then( m => m.FlightFormPage)
  }
];
