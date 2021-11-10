import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHorseDialogComponent } from './delete-horse-dialog.component';

describe('DeleteHorseDialogComponent', () => {
  let component: DeleteHorseDialogComponent;
  let fixture: ComponentFixture<DeleteHorseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteHorseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteHorseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
