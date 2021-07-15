import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/model/horse-model';
import { Horse as HorseModel } from 'src/model/booking-model'

@Injectable({
  providedIn: 'root'
})
export class HorseServiceService {

  //url = "https://arena-bookings.herokuapp.com"
  url = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  }

  constructor(private http: HttpClient) { }

  createHorse(horse: Horse) {
    return this.http.post<Horse>(this.url, horse)

  }

  getHorses(): Observable<Horse[]> {
    const newLocal = this.http.get<Horse[]>(`${this.url}/horses`, this.httpOptions);
    return newLocal
  }

  getAllHorses(): Observable<HorseModel[]> {
    return this.http.get<HorseModel[]>(`${this.url}/horses`, this.httpOptions);
  }
}
