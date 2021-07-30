import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'bookings', component: BookingCalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
