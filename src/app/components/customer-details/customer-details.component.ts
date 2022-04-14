import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer, CustomerHorse, CustomerUser } from 'src/model/customer-model';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AddHorseDialogComponent } from '../add-horse-dialog/add-horse-dialog.component';
import { DeleteHorseDialogComponent } from '../delete-horse-dialog/delete-horse-dialog.component';
import { EditCustomerDetailsDialogComponent } from '../edit-customer-details-dialog/edit-customer-details-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { User } from 'src/app/services/user.service';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { DeleteCustomerComponent } from '../delete-customer/delete-customer.component';

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
  displayedColumns: string[] = ['firstName', 'lastName']
  expandedRow: Customer | null = null;

  constructor(private createCustomerDialog: MatDialog,
     private customerService: CustomerService,
     private addHorseDialog: MatDialog,
     private deleteHorseDialog: MatDialog,
     private editCustomerDialog: MatDialog,
     private addUserDialog: MatDialog,
     private deleteUserDialog: MatDialog,
     private deleteCustomerDialog: MatDialog
     ) {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    })
  }

  ngOnInit(): void {

  }

  openCreateCustomerDialog() {
    const dialogRef = this.createCustomerDialog.open(AddCustomerDialogComponent, {
      width: '90%',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result)=> {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    })
  }

  openAddHorseDialog(customerId: number) {
    const dialogRef = this.addHorseDialog.open(AddHorseDialogComponent, {
      width: '90%',
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

  openDeleteHorseDialog(horses: CustomerHorse[]) {
    const dialogRef = this.deleteHorseDialog.open(DeleteHorseDialogComponent, {
      width: '90%',
      data: {
        horses: horses
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    })
  }

  openEditCustomerDialog(customerId: Number, customerDetails: CustomerDetails) {
    const dialogRef = this.editCustomerDialog.open(EditCustomerDetailsDialogComponent, {
      width: '90%',
      data: {
        customerId: customerId,
        customerDetails: customerDetails
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    });
  }

  openAddUserDialog(customerId: number) {
    const dialogRef = this.addUserDialog.open(AddUserDialogComponent, {
      width: '90%',     
      data: {
        customerId: customerId
      } 
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    });
    
  } 

  openDeleteUserDialog(users: CustomerUser[]) {
    const dialogRef = this.deleteUserDialog.open(DeleteUserDialogComponent, {
      width: '90%',
      data: {
        users: users
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
      });
    });
    
  }

  openDeleteCustomerDialog(customerId: number) {
    const dialogRef = this.deleteCustomerDialog.open(DeleteCustomerComponent, {
      width: '90%',
      data: {
        customerId: customerId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
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
      return ''
    }
    else if (inp == 'lastName') {
      return ''
    }
    else if (inp == 'phoneNumber') {
      return 'mobile'
    }
    else return inp
  }

  formatRoleName(role: string): string {
    if (role === 'ROLE_ADMIN') return 'Admin' 
    else if (role === 'ROLE_USER') return 'User'
    else return ''
  }

  logout() {
    localStorage.removeItem('token');
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

