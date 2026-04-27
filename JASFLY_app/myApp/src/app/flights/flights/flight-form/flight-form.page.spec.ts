import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightFormPage } from './flight-form.page';

describe('FlightFormPage', () => {
  let component: FlightFormPage;
  let fixture: ComponentFixture<FlightFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
