import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking, BookingCustomer } from 'src/model/booking-model';
import { BookingDetails, BookingRequest } from '../components/booking-dialog/booking-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  constructor(private http: HttpClient) { }

  baseUrl = environment.serverUrl
  
  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
  }  
  
  getBookings(): Observable<BookingCustomer[]> {
    //return this.http.get<Booking[]>('http://localhost:8080/bookings', this.option)  
    return this.http.get<BookingCustomer[]>(`${this.baseUrl}/bookings`, this.option)
  }
  
  createBooking(booking: BookingRequest): Observable<Booking> {
    return this.http.post<Booking>(`${this.baseUrl}/bookings`, booking, this.option)
  }

  deleteById(bookingId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bookings/${bookingId}`, this.option)
  }
}
