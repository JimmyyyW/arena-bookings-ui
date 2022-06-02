import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from 'src/app/services/booking.service';
import { Horse } from 'src/model/booking-model';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';
import { BookingDetails } from '../booking-dialog/booking-dialog.component';

@Component({
  selector: 'app-lunge-booking-dialog',
  templateUrl: './lunge-booking-dialog.component.html',
  styleUrls: ['./lunge-booking-dialog.component.scss']
})
export class LungeBookingDialogComponent implements OnInit {

  form: FormGroup;
  startTime: string;
  slots: number[];
  horses: Horse[];
  public defaultDuration = 60;

  days = {
    2: 'Monday',
    3: 'Tuesday',
    4: 'Wednesday',
    5: 'Thursday',
    6: 'Friday',
    7: 'Saturday',
    1: 'Sunday',
  }


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingCalendarComponent>,
    private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public bookingDetails: BookingDetails) {
    this.slots = bookingDetails.availableSlotsLp
    this.horses = bookingDetails.horses
    this.startTime = Object.values(this.days)[bookingDetails.startTime.getDay()]
      + ' ' + bookingDetails.startTime.toLocaleTimeString().substr(0, 5)
    this.form = this.fb.group({
      horseName: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.controls.horseName.setValue(this.horses[0].name)
    this.form.controls.duration.setValue(this.bookingDetails.availableSlotsLp.reverse()[0])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    let start = this.bookingDetails.startTime;
    let timeToAdd = this.form.value['duration']
    let endTime = this.addMinutesToDate(start, parseInt(timeToAdd))
    this.bookingService.createBookingLp({
      horseId: this.form.value['horseName'],
      startTime: this.bookingDetails.startTime,
      endTime: endTime,
    }).subscribe(data => data)
    this.dialogRef.close({time: this.bookingDetails.startTime})
  }
   


  private addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
  }

}
