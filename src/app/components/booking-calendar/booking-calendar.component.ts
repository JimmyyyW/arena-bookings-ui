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
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
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
    console.log(event)
    const dialogRef = this.createDialog.open(BookingDialogComponent, {
      width: '50%',
      data: {
        horses: this.horses,
        startTime: event,
        duration: this.duration,
        jumps: this.jumps,
        sharing: this.sharing
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.events = [];
      this.populateBookings();
    })
    return undefined    
  }

  eventClicked(event: any) {
    console.log(event.event.id)
    const dialogRef = this.deleteDialog.open(DeleteEventDialogComponent, {
      width: '50%', 
      data: {
        bookingId: event.event.id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  parseViewDate(): string {
    return this.viewDate.toDateString()
  }

}