import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { Horse } from 'src/model/booking-model';
import { BookingCalendarComponent } from '../booking-calendar/booking-calendar.component';

@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit {

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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingCalendarComponent>,
    private bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public bookingDetails: BookingDetails
  ) { 
    this.slots = bookingDetails.availableSlots
    this.horses = bookingDetails.horses
    this.startTime = Object.values(this.days)[bookingDetails.startTime.getDay()] 
    + ' ' + bookingDetails.startTime.toLocaleTimeString().substr(0, 5)
    this.form = this.fb.group({
      horseName: ['', Validators.required],
      duration: ['', Validators.required],
      jumps: ['', Validators.required],
      sharing: ['', Validators.required],
    });    
  }


  ngOnInit(): void {
    this.form.controls.horseName.setValue(this.horses[0].name)
    this.form.controls.duration.setValue(this.bookingDetails.availableSlots.reverse()[0])
    this.form.controls.jumps.setValue('false')
    this.form.controls.sharing.setValue('false')
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm() {
    let start = this.bookingDetails.startTime;
    let timeToAdd = this.form.value['duration']
    let endTime = this.addMinutesToDate(start, parseInt(timeToAdd))
    this.bookingService.createBooking({
      horseId: this.form.value['horseName'],
      startTime: this.bookingDetails.startTime,
      endTime: endTime,
      jumps: this.form.value['jumps'],
      sharing: this.form.value['sharing'],
    }).subscribe(data => console.log(data))
    this.dialogRef.close(this.bookingDetails.startTime)
    
  }

  private addMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

}

export interface BookingDetails {
  horses: Horse[],
  startTime: Date,
  duration: number,
  jumps: boolean,
  sharing: boolean,
  availableSlots: number[]
}

export interface BookingRequest {
  horseId: number,
  startTime: Date,
  endTime: Date,
  jumps: boolean,
  sharing: boolean
}