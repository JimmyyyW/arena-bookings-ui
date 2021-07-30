import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  option = {
    headers: new HttpHeaders().append('Content-Type', 'application/x-www-form-urlencoded'),
    withCredentials: true
  }

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    const body = new HttpParams()
      .append("username", username)
      .append("password", password)

    return this.http.post<any>("https://arena-bookings.herokuapp.com/login", body.toString(), this.option)
      .pipe((response) => {
        console.log(response);
        console.log("login successful!")
        localStorage.setItem('username', username);
        this.isLoggedIn = true;
        return response;
      });
  }

}
