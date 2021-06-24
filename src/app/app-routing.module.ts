import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { HorseComponentComponent } from './components/horse-component/horse-component.component';

const routes: Routes = [
  { path: 'horses', component: HorseComponentComponent },
  { path: 'bookings', component: BookingCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
