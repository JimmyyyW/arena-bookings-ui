import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/model/customer-model';
import { CustomerDetails } from '../components/customer-details/customer-details.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //baseUrl = 'http://localhost:8080'
  baseUrl = environment.serverUrl

  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer ' + localStorage.getItem('token')),
  }  
  

  constructor(private http: HttpClient) { }

  createCustomer(customerDetails: CustomerDetails) {  
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customerDetails, this.option);
  }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`, this.option);
  }

  updateCustomer(customerId: number, customerDetails: CustomerDetails) {
    return this.http.put<Customer>(`${this.baseUrl}/customers/${customerId}`, customerDetails, this.option);
  }

}
