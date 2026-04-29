import { Routes, Router } from '@angular/router';
import { FlightService } from './flights/flight.service';
import { inject } from '@angular/core';

const authGuard = () => {
  const flightService = inject(FlightService);
  const router = inject(Router);

  if (flightService.loggedPilotID() !== null) {
    return true;
  }

  router.navigate(['/login']);
  return false;
}
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'flight-list',
    loadComponent: () => import('./flights/flight-list/flight-list.page').then(m => m.FlightListPage),
    canActivate: [authGuard]
  },
  {
    path: 'flight-form',
    loadComponent: () => import('./flights/flight-form/flight-form.page').then(m => m.FlightFormPage),
    canActivate: [authGuard]
  },
  {
    path: 'flight-form/:id',
    loadComponent: () => import('./flights/flight-form/flight-form.page').then(m => m.FlightFormPage),
    canActivate: [authGuard]
  },
  {
    path: 'flight-summary/:id',
    loadComponent: () => import('./flights/flight-summary/flight-summary.page').then(m => m.FlightSummaryPage),
    canActivate: [authGuard]
  }
];
