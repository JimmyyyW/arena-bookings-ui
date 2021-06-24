import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/model/booking-model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer asdasd'),
  }  
  
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('http://localhost:8099/bookings', this.option)
  }
}
