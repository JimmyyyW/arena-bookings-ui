import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseUrl = environment.serverUrl

  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
  }  
  

  constructor(private httpClient: HttpClient) { }

  createUser(user: User) {
    return this.httpClient.post<any>(`${this.baseUrl}/users`, user, this.option)
  }

  deleteUser(userId: number) {
    return this.httpClient.delete<any>(`${this.baseUrl}/users/${userId}`, this.option)
  }

}

export interface User {
  username: string,
  password: string,
  enabled: boolean,
  customerId: number,
  role: string
}

