import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

@Component({
  selector: 'app-delete-event-dialog',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.scss']
})
export class DeleteEventDialogComponent implements OnInit {

  constructor(
    private bookingService: BookingService,
    public dialogRef: MatDialogRef<BookingCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteBooking() {
    this.bookingService.deleteById(this.data.bookingId)
    .subscribe(data => {
      this.dialogRef.close();
    })
  }

}

export interface DialogData {
    bookingId: number
}
