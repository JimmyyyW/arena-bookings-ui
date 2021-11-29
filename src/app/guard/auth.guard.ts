import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('token') !== undefined 
        && localStorage.getItem('token') !== null 
        && console.log(this.isTokenExpired(localStorage.getItem('token')!))) {        
        return true;      
      } else {        
        //console.log(expiryDate);        
        this.router.navigate(['/login']);
        return false;
      }
  }

  isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwtDecode(token);
    }
    catch(Error){
        return null;
    }
  }
  
}
