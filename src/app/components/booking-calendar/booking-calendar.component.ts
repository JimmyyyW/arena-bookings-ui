import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateAdapter, CalendarEvent, CalendarView, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { setHours, setMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { Horse } from 'src/model/booking-model';
import { HorseService } from 'src/service/horse-service.service';
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
  grey: {
    primary: '#707070',    
    secondary: '#c7c7c7'
  }
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
  
  refresh: Subject<any> = new Subject();
  
  events: CalendarEvent[] = [];
  
  activeDayIsOpen: boolean = false;
  
  clickedDate: Date | undefined;

  horseName: string | undefined;
  startTime: Date | undefined;
  duration: number | undefined;
  jumps: boolean | undefined;
  sharing: boolean | undefined;

  isAdmin: boolean = false;
  
  
  constructor(private bookingService: BookingService,
    public createDialog: MatDialog,
    public deleteDialog: MatDialog,
    private horseService: HorseService,
    private authService: AuthService
  ) {
    this.isAdmin = authService.isAdmin;
  }
  
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.populateBookings();
    this.horses = this.horseService.getMyHorses()
  }

  populateBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      bookings.forEach(bookingCustomer => {
    
        let colour;
        
        /*
         title: 'No event end date',
              start: setHours(setMinutes(new Date(), 15), 3),
              end: setHours(setMinutes(new Date(), 30), 3),
              color: colors.red,
        */      

        const start = new Date(bookingCustomer.booking.startTime);
        const end = new Date(bookingCustomer.booking.endTime);

        if (bookingCustomer.customerId.toString() === localStorage.getItem('customerId')) {
          colour = colors.yellow;
        }
        
        const today = new Date();
        if (end.getTime() < today.getTime() && today > end) {
          colour = colors.grey;
        }

        let displayName = `<b>${bookingCustomer.booking.horse.name}</b>`
        if (bookingCustomer.booking.jumps == true) {
          displayName = displayName.concat(' -- Jumps')
        }

        if (bookingCustomer.booking.sharing == true) {
          displayName = displayName.concat(' -- Sharing')
        }    


        this.events.push(
          {
            id: bookingCustomer.booking.bookingId,
            title: displayName,
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

    const nextEvent = this.events.filter(existingEvent => existingEvent.end! > event)
      .sort((a, b) => a.start.getTime() - b.start.getTime())[0]

    
    const plusThirty = this.addMinutesToDate(event, 30)
    const plusFourtyfive = this.addMinutesToDate(event, 45)
    const plusSixty = this.addMinutesToDate(event, 60)
    
    let availableSlots = [ 15, 30, 45, 60 ]
    
    if (nextEvent.start === undefined) {
      availableSlots = [ 15, 30, 45, 60 ]
    }
    
    else if (plusThirty > nextEvent.start!) {
      availableSlots = [ 15 ]
    }

    else if (plusFourtyfive > nextEvent.start!) {
      availableSlots = [ 15, 30 ]
    }

    else if (plusSixty > nextEvent.start!) {
      availableSlots = [ 15, 30, 45 ]
    }
    this.horses?.subscribe(horses => {
      if (!horses.length) alert('you have no registered horses!')
      else {        
        const dialogRef = this.createDialog.open(BookingDialogComponent, {
          data: {
            horses: horses,
            startTime: event,
            duration: this.duration,
            jumps: this.jumps,
            sharing: this.sharing,
            availableSlots: availableSlots
          }
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result !== undefined) {
            this.events = [];
            this.populateBookings();
          }
        })
      }
    })
    return undefined    
  }

  eventClicked(event: any) {
    const today = new Date();
    console.log(event.event.start);
    console.log(today);
    if (event.event.start < this.addMinutesToDate(today, 1440) && event.event.color === colors.yellow && !this.authService.isAdmin) {
      alert('it is too late to delete this booking');
    }
    else if (event.event.start < today) {
      alert('cannot delete historic bookings');
    }
    else if (event.event.color !== colors.yellow && !this.authService.isAdmin) {
      alert('you cannot delete other peoples bookings!');
    } else {
      const dialogRef = this.deleteDialog.open(DeleteEventDialogComponent, {
        panelClass: 'my-outlined-dialog',
        data: {
          bookingId: event.event.id
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.events = [];
        this.populateBookings();
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  clearAuth() {
    localStorage.removeItem('token');
  }

  parseViewDate(): string {
    return this.viewDate.toDateString()
  }

  private addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}


}