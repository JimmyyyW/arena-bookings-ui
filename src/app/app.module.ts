import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HorseComponentComponent } from './components/horse-component/horse-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
//import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
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


@NgModule({
  declarations: [
    AppComponent,
    HorseComponentComponent,
    //LoginComponent,
    BookingCalendarComponent,
    BookingDialogComponent,
    DeleteEventDialogComponent
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
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NgbModule,

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
