import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightListPage } from './flight-list.page';

describe('FlightListPage', () => {
  let component: FlightListPage;
  let fixture: ComponentFixture<FlightListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
