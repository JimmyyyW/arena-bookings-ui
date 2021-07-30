import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/model/customer-model';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AddHorseDialogComponent } from '../add-horse-dialog/add-horse-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', width: '80%'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CustomerDetailsComponent implements OnInit {

  customers: Customer[] = []
  displayedColumns: string[] = ['customerId', 'email', 'firstName', 'lastName', 'phoneNumber']
  columnHeaders = {
    customerId: 'ID',
    email: 'email',
    firstName: 'first name',
    lastName: 'last name',
    phoneNumber: 'phone number'
  };
  x: number[] = [0, 1, 2, 3, 4]
  expandedRow: Customer | null = null;

  constructor(private createCustomerDialog: MatDialog,
     private customerService: CustomerService,
     private addHorseDialog: MatDialog) {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    })
  }

  ngOnInit(): void {

  }

  openCreateCustomerDialog() {
    const dialogRef = this.createCustomerDialog.open(AddCustomerDialogComponent, {
      minWidth: '600px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result)=> {
      console.log(result);
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    })
  }

  openAddHorseDialog(customerId: number) {
    const dialogRef = this.addHorseDialog.open(AddHorseDialogComponent, {
      minWidth: '600px',
      data: {
        customerId: customerId
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    })
    
  }

  wrap(inp: any) {
    if (inp == 'customerId') {
      return 'ID'
    } 
    else if (inp == 'firstName') {
      return 'first name'
    }
    else if (inp == 'lastName') {
      return 'last name'
    }
    else if (inp == 'phoneNumber') {
      return 'mobile'
    }
    else return inp
  }
}

export interface CustomerDetails {
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  addressOne: string
  addressTwo: string
  city: string
  county: string
  postCode: string
}

