import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { DeleteEventDialogComponent } from './components/delete-event-dialog/delete-event-dialog.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { AddCustomerDialogComponent } from './components/add-customer-dialog/add-customer-dialog.component';
import { AddHorseDialogComponent } from './components/add-horse-dialog/add-horse-dialog.component';
import { DeleteHorseDialogComponent } from './components/delete-horse-dialog/delete-horse-dialog.component';
import { EditCustomerDetailsDialogComponent } from './components/edit-customer-details-dialog/edit-customer-details-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { DeleteCustomerComponent } from './components/delete-customer/delete-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookingCalendarComponent,
    BookingDialogComponent,
    DeleteEventDialogComponent,
    CustomerDetailsComponent,
    AddCustomerDialogComponent,
    AddHorseDialogComponent,
    DeleteHorseDialogComponent,
    EditCustomerDetailsDialogComponent,
    AddUserDialogComponent,
    DeleteUserDialogComponent,
    DeleteCustomerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatExpansionModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
