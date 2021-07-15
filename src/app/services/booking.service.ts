import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from 'src/model/booking-model';
import { BookingDetails, BookingRequest } from '../components/booking-dialog/booking-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  constructor(private http: HttpClient) { }
  
  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5LGFkbWluIiwiaXNzIjoiZXhhbXBsZS5pbyIsImlhdCI6MTYyNTc3MjI2MSwiZXhwIjoxNjI2Mzc3MDYxfQ.q8TDJgjTkeOXlkR5HP1otQUa6PtECIafxlVm-d4YtPB-paWnO6GU2YNkRZ6KVQy-RyG5k2aYxTt6Yrbv-zLEUQ'),
  }  
  
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>('http://localhost:8080/bookings', this.option)
  }
  
  createBooking(booking: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>('http://localhost:8080/bookings', booking, this.option)
  }

  deleteById(bookingId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/bookings/${bookingId}`, this.option)
  }
}
