import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/model/horse-model';
import { Horse as HorseModel } from 'src/model/booking-model'

@Injectable({
  providedIn: 'root'
})
export class HorseService {

  url = "https://arena-bookings.herokuapp.com"
  //url = "http://localhost:8080"

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5LGFkbWluIiwiaXNzIjoiZXhhbXBsZS5pbyIsImlhdCI6MTYyNDQ5MDExNywiZXhwIjoxNjI1MDk0OTE3fQ.-5LTQ7DmLQOJ6-RlkoywrgOZETTpwQQ7YJIeF1QmGoyRgRDP90Jz1SCzEQ8LRG_yM-jUNSOUFiq1b1IFbW8NBw'
    })
  }

  constructor(private http: HttpClient) { }

  createHorse(horse: Horse) {
    return this.http.post<Horse>(this.url, horse)

  }

  addHorse(name: string, customerId: number) {
    const createHorseRequest = {
      horseId: null,
      customerId: customerId,
      name: name
    }
    return this.http.post<HorseModel>(`${this.url}/horses`, createHorseRequest, this.httpOptions)
  }

  getHorses(): Observable<Horse[]> {
    const newLocal = this.http.get<Horse[]>(`${this.url}/horses`, this.httpOptions);
    return newLocal
  }

  getAllHorses(): Observable<HorseModel[]> {
    return this.http.get<HorseModel[]>(`${this.url}/horses`, this.httpOptions);
  }
}
