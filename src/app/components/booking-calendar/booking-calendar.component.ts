import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DateAdapter, CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { BookingService } from 'src/app/services/booking.service';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingCalendarComponent {

  constructor(private bookingService: BookingService) {}

  view: CalendarView = CalendarView.Day;

  viewDate: Date = new Date();

  day = new Date().setDate(28)

  events: CalendarEvent[] = []

  activeDayIsOpen: boolean = false;


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.bookingService.getBookings().subscribe(bookings => {
      bookings.forEach(booking => {
        let colour;
        if (booking.jumps === true) {
            colour = colors.blue
        } else colour = colors.red
/*
 title: 'No event end date',
      start: setHours(setMinutes(new Date(), 15), 3),
      end: setHours(setMinutes(new Date(), 30), 3),
      color: colors.red,
*/
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        this.events.push(
          {
            title: booking.horse.name,
            start: setHours(setMinutes(start, start.getMinutes()), start.getHours()),
            end: setHours(setMinutes(end, end.getMinutes()), end.getHours()),
            color: colour,
          }
        )
      })
      console.log(this.events)
    })
  }
}