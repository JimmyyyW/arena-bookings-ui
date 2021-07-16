import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { HorseComponentComponent } from './components/horse-component/horse-component.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'horses', component: HorseComponentComponent },
  { path: 'bookings', component: BookingCalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customers', component: CustomerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
