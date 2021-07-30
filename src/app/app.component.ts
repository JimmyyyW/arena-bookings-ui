import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  buttonRoute: string = ''
  buttonName: string = ''

  constructor(private router: Router) {
    router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        if (data.url == '/customers') {
          this.buttonRoute = '/bookings'
          this.buttonName = 'Bookings'
        }
        else if (data.url == '/bookings') {
          this.buttonRoute = '/customers'
          this.buttonName = 'Customers'
        }
      }
    })
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

  title = 'booking-horses-ui';
  condition = true;
}
