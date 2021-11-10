import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/model/horse-model';
import { Horse as HorseModel } from 'src/model/booking-model'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  //url = "https://arena-bookings.herokuapp.com"
  baseUrl = environment.serverUrl

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }

  constructor(private http: HttpClient) { }

  createHorse(horse: Horse) {
    return this.http.post<Horse>(this.baseUrl, horse)

  }

  addHorse(name: string, customerId: number) {
    const createHorseRequest = {
      horseId: null,
      customerId: customerId,
      name: name
    }
    return this.http.post<HorseModel>(`${this.baseUrl}/horses`, createHorseRequest, this.httpOptions)
  }

  getHorses(): Observable<Horse[]> {
    const newLocal = this.http.get<Horse[]>(`${this.baseUrl}/horses`, this.httpOptions);
    return newLocal
  }

  getAllHorses(): Observable<HorseModel[]> {
    return this.http.get<HorseModel[]>(`${this.baseUrl}/horses`, this.httpOptions);
  }

  deleteHorse(horseId: number) {
    return this.http.delete<any>(`${this.baseUrl}/horses/${horseId}`, this.httpOptions);
  }

}
