import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent implements OnInit {

  createCustomerForm: FormGroup

  constructor(public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private fb: FormBuilder,
    private customerService: CustomerService) {
    this.createCustomerForm = this.fb.group({
      email: ['', [
        Validators.email,
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      phone: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: [''],
      city: ['', Validators.required],
      county: ['', Validators.required],
      postCode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  submitCustomerForm() {
    this.customerService.createCustomer({
      email: this.createCustomerForm.get('email')?.value,
      phoneNumber: this.createCustomerForm.get('phone')?.value,
      firstName: this.createCustomerForm.get('firstName')?.value,
      lastName: this.createCustomerForm.get('lastName')?.value,
      addressOne: this.createCustomerForm.get('addressOne')?.value,
      addressTwo: this.createCustomerForm.get('addressTwo')?.value,
      city: this.createCustomerForm.get('city')?.value,
      county: this.createCustomerForm.get('county')?.value,
      postCode: this.createCustomerForm.get('postCode')?.value
    }).subscribe((data) => {
      //do what here?
      this.dialogRef.close();
    })
    
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
