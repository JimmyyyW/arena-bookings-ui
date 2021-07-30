import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from 'src/model/customer-model';
import { CustomerDetails } from '../components/customer-details/customer-details.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //baseUrl = 'http://localhost:8080'
  baseUrl = 'https://arena-bookings.herokuapp.com'

  option = {
    headers: new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Origin', '*')
    .append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5LGFkbWluIiwiaXNzIjoiZXhhbXBsZS5pbyIsImlhdCI6MTYyNTc3MjI2MSwiZXhwIjoxNjI2Mzc3MDYxfQ.q8TDJgjTkeOXlkR5HP1otQUa6PtECIafxlVm-d4YtPB-paWnO6GU2YNkRZ6KVQy-RyG5k2aYxTt6Yrbv-zLEUQ'),
  }  
  

  constructor(private http: HttpClient) { }

  createCustomer(customerDetails: CustomerDetails) {
    return this.http.post<Customer>(`${this.baseUrl}/customers`, customerDetails, this.option);
  }

  getCustomers() {
    return this.http.get<Customer[]>(`${this.baseUrl}/customers`, this.option);
  }

}
