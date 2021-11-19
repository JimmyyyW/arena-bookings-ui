import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  failedLogin: Boolean = false;
  loginError: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }


  ngOnInit(): void {
    
  }

  submitLoginForm() {
    this.authService.login(this.loginForm.get('username')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        (response: HttpResponse<any>) => {        
          if (response.headers.get('Authorization') !== undefined || response.headers.get('Authorization') !== null) {
            localStorage.setItem('token', response.headers.get('Authorization')!)          
            this.router.navigateByUrl('/bookings');
          } 
        },
        error => {
          this.loginError = true;
        }
      )
  }

  redirectToSignUp() {
    this.router.navigateByUrl('/signup')
  }

}


