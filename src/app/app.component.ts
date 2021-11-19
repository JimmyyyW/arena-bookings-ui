import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  constructor(private router: Router, private authService: AuthService) {        
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

  
}
