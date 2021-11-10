import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetails, CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-edit-customer-details-dialog',
  templateUrl: './edit-customer-details-dialog.component.html',
  styleUrls: ['./edit-customer-details-dialog.component.scss']
})
export class EditCustomerDetailsDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {
    this.form = this.fb.group({
      email: [dialogData.customerDetails.email, [
        Validators.email,
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      phone: [dialogData.customerDetails.phoneNumber, Validators.required],
      firstName: [dialogData.customerDetails.firstName, Validators.required],
      lastName: [dialogData.customerDetails.lastName, Validators.required],
      addressOne: [dialogData.customerDetails.addressOne, Validators.required],
      addressTwo: [dialogData.customerDetails.addressTwo],
      city: [dialogData.customerDetails.city, Validators.required],
      county: [dialogData.customerDetails.county, Validators.required],
      postCode: [dialogData.customerDetails.postCode, Validators.required]
    });
  }

  submitEditCustomerForm() {
    this.customerService.updateCustomer(this.dialogData.customerId, {
      email: this.form.get('email')?.value,
      phoneNumber: this.form.get('phone')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value,
      addressOne: this.form.get('addressOne')?.value,
      addressTwo: this.form.get('addressTwo')?.value,
      city: this.form.get('city')?.value,
      county: this.form.get('county')?.value,
      postCode: this.form.get('postCode')?.value
    }).subscribe(
      result => {
        this.dialogRef.close();
      },
      error => {
        alert('Unable to update details at this ')
      });
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }

}

export interface DialogData {
  customerId: number,
  customerDetails: CustomerDetails
}
