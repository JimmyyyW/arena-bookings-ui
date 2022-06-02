import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LungeBookingDialogComponent } from './lunge-booking-dialog.component';

describe('LungeBookingDialogComponent', () => {
  let component: LungeBookingDialogComponent;
  let fixture: ComponentFixture<LungeBookingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LungeBookingDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LungeBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
