import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDetailsDialogComponent } from './edit-customer-details-dialog.component';

describe('EditCustomerDetailsDialogComponent', () => {
  let component: EditCustomerDetailsDialogComponent;
  let fixture: ComponentFixture<EditCustomerDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCustomerDetailsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
