import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HotelGuard  {
  constructor(private authService: AuthService, private router: Router) { }


  canLoad(route: Route): boolean {
    let url = route.path?.toString();
    console.log('Url:' + url);
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.authService.setRedirectUrl(String(url));
    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    console.log('Url:' + url);
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.authService.setRedirectUrl(url);
    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }



}
