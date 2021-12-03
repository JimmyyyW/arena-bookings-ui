import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';

@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.scss']
})
export class DeleteCustomerComponent implements OnInit {

  customerId: number

  constructor(public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) dialogData: DeleteCustomerDialogData
    ) {
      this.customerId = dialogData.customerId
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.customerId)
      .subscribe(data => {
        this.dialogRef.close();
      });
  }

}

export interface DeleteCustomerDialogData {
  customerId: number
}
