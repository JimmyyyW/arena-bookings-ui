import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    const body = new HttpParams()
      .append("username", username)
      .append("password", password)

    return this.http.post<any>("http://localhost:8081/api/v2/login", body.toString())
      .pipe((response) => {
        console.log(response);
        console.log("login successful!")
        localStorage.setItem('username', username);
        this.isLoggedIn = true;
        return response;
      });
  }

}
