import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  createCustomerForm: FormGroup

  constructor(private fb: FormBuilder) {
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
      addressTwo: ['', Validators.required],
      city: ['', Validators.required],
      county: ['', Validators.required],
      postCode: ['', Validators.required]
    })
    //this.createCustomerForm.addControl('emailControl', new FormControl('', [Validators.email, Validators.required]))
  }
  //
  ngOnInit(): void {

  }

  submitCustomerForm() {
    let customerDetails = {
      email: this.createCustomerForm.get('email')?.value,
      phone: this.createCustomerForm.get('phone')?.value,
      firstName: this.createCustomerForm.get('firstName')?.value,
      lastName: this.createCustomerForm.get('lastName')?.value,
      addressOne: this.createCustomerForm.get('addressOne')?.value,
      addressTwo: this.createCustomerForm.get('addressTwo')?.value,
      city: this.createCustomerForm.get('city')?.value,
      county: this.createCustomerForm.get('county')?.value,
      postCode: this.createCustomerForm.get('postCode')?.value
    }
    console.log(customerDetails);
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}

