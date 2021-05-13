import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horse } from 'src/model/horse-model';

@Injectable({
  providedIn: 'root'
})
export class HorseServiceService {

  url = "http://localhost:8099"

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  createHorse(horse: Horse) {
    return this.http.post<Horse>(this.url, horse)

  }

  getHorses(): Observable<Horse[]> {
    const newLocal = this.http.get<Horse[]>(`${this.url}/horses`, this.httpOptions);
    return newLocal
  }
}
