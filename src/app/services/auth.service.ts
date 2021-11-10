import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.serverUrl;

  isLoggedIn = false;

  option = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Authorization', ''),   
    observe: 'response' as 'body'   
  }

  constructor(private http: HttpClient) { }


  login(username: string, password: string) {
    const body = {
      'username': username,
      'password': password
    }
    this.option.headers.set('Authorization', `Basic ${btoa(username + ':' + password)}`)
    
    return this.http.post<any>(`${this.baseUrl}/login`, body, this.option)
      .pipe((response) => {    
        response.subscribe(data => {
        })
        this.isLoggedIn = true;
        return response;
      });
  }

}
