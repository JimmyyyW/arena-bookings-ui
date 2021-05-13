import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseComponentComponent } from './horse-component.component';

describe('HorseComponentComponent', () => {
  let component: HorseComponentComponent;
  let fixture: ComponentFixture<HorseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorseComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
