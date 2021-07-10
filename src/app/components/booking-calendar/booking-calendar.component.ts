import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { Horse } from 'src/model/booking-model';
import { HorseServiceService } from 'src/service/horse-service.service';
import { BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { DeleteEventDialogComponent } from '../delete-event-dialog/delete-event-dialog.component';
import { utcToZonedTime } from 'date-fns-tz';
import {  } from 'moment';

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

  
  horses: Observable<Horse[]> | undefined;
  
  view: CalendarView = CalendarView.Day;
  
  viewDate: Date = new Date();
  
  day = new Date().setDate(28);
  
  refresh: Subject<any> = new Subject();
  
  events: CalendarEvent[] = [];
  
  activeDayIsOpen: boolean = false;
  
  clickedDate: Date | undefined;

  horseName: string | undefined;
  startTime: Date | undefined;
  duration: number | undefined;
  jumps: boolean | undefined;
  sharing: boolean | undefined;
  
  
  constructor(private bookingService: BookingService,
    public createDialog: MatDialog,
    public deleteDialog: MatDialog,
    private horseService: HorseServiceService
  ) {
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.populateBookings();
    this.horses = this.horseService.getAllHorses()
  }

  populateBookings() {
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
        // const start = new Date(booking.startTime);
        // const end = new Date(booking.endTime);
        const start = new Date(utcToZonedTime(booking.startTime, "London"));
        const end = new Date(utcToZonedTime(booking.endTime, "London"));
        const vents = [];
        this.events.push(
          {
            id: booking.bookingId,
            title: booking.horse.name,
            start: setHours(setMinutes(start, start.getMinutes()), start.getHours()),
            end: setHours(setMinutes(end, end.getMinutes()), end.getHours()),
            color: colour,
          }
        )
        this.refresh.next();
      });
    })
  }


  openDialog(event: any) {
    if (event < new Date()) {
      return 
    }    
    console.log(this.events);
    const nextEvent = this.events.filter(existingEvent => existingEvent.end! > event)
      .sort((a, b) => a.start.getTime() - b.start.getTime())[0].end 
    
    const plusThirty = this.addMinutesToDate(event, 90)
    const plusFourtyfive = this.addMinutesToDate(event, 105)
    const plusSixty = this.addMinutesToDate(event, 120)
    
    let availableSlots = [ 15, 30, 45, 60 ]
    
    if (plusThirty > nextEvent!) {
      availableSlots = [ 15 ]
    }

    else if (plusFourtyfive > nextEvent!) {
      availableSlots = [ 15, 30 ]
    }

    else if (plusSixty > nextEvent!) {
      availableSlots = [ 15, 30, 45 ]
    }

    console.log(availableSlots);
    const dialogRef = this.createDialog.open(BookingDialogComponent, {
      data: {
        horses: this.horses,
        startTime: event,
        duration: this.duration,
        jumps: this.jumps,
        sharing: this.sharing,
        availableSlots: availableSlots
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.events = [];
      this.populateBookings();
    })
    return undefined    
  }

  eventClicked(event: any) {
    const dialogRef = this.deleteDialog.open(DeleteEventDialogComponent, {
      panelClass: 'my-outlined-dialog',
      data: {
        bookingId: event.event.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.events = [];
      this.populateBookings();
    })
  }

  parseViewDate(): string {
    return this.viewDate.toDateString()
  }

  private addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}


}