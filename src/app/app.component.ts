import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  buttonRoute: string = ''
  buttonName: string = ''
  title = 'booking-horses-ui';
  condition = false;

  baseUrl = environment.serverUrl;

  option = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }  

  constructor(private router: Router, private authService: AuthService) {    
    this.keepDynoAwake();    
    router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.condition = this.authService.isAdmin;
        if (data.url == '/customers') {
          this.buttonRoute = '/bookings'
          this.buttonName = 'Bookings'
        }
        else if (data.url == '/bookings') {
          this.buttonRoute = '/customers'
          this.buttonName = 'Customers'
        }
      }
    });
  }

  updateButtonRoute() {
    if (this.router.url == '/customers') {
      this.buttonRoute = '/bookings'
      this.buttonName = 'Bookings'
    } else if (this.router.url == '/bookings') {
      this.buttonRoute = '/customers'
      this.buttonName = 'Customers'
    }
  }

  

  keepDynoAwake() {
    setInterval(() => {
      fetch(`${this.baseUrl}/actuator/health`, this.option)
        .then(res => res.json())      
        .then(data => console.log(data))
        .catch(err => console.log(err))
        .finally(() => console.log('health check complete'));
    }, 600000)
  }
  
}
