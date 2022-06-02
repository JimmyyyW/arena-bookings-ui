import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';
import { BookingDetails, BookingDialogComponent } from '../booking-dialog/booking-dialog.component';
import { LungeBookingDialogComponent } from '../lunge-booking-dialog/lunge-booking-dialog.component';

@Component({
  selector: 'app-booking-select',
  templateUrl: './booking-select.component.html',
  styleUrls: ['./booking-select.component.scss']
})
export class BookingSelectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookingCalendarComponent>,
    public arenaDialog: MatDialog,
    public lungeDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public bookingDetails: BookingDetails) { }

  ngOnInit(): void {
  }

  openArenaDialog() {
    const dialogRef = this.arenaDialog.open(BookingDialogComponent, {
      data: {
        horses: this.bookingDetails.horses,
        startTime: this.bookingDetails.event,
        duration: this.bookingDetails.duration,
        jumps: this.bookingDetails.jumps,
        sharing: this.bookingDetails.sharing,
        availableSlots: this.bookingDetails.availableSlots,
        event: this.bookingDetails.event
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef.close();
    });
  }

  openLungeDialog() {
    const dialogRef = this.lungeDialog.open(LungeBookingDialogComponent, {
      data: {
        horses: this.bookingDetails.horses,
        startTime: this.bookingDetails.event,
        duration: this.bookingDetails.duration,
        availableSlotsLp: this.bookingDetails.availableSlotsLp,
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogRef.close();
    });
  }  

}
