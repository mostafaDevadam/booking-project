import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard {

  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  canLoad(route: Route): boolean {
    let url = route.path?.toString();
    console.log('Url:' , url);
    if (this.authService.isUserLoggedIn()){ // && this.authService.getRole() == 'guest') {
      //console.log("auth role in guest guard: ", this.authService.getRole())
      return true;
    }
    this.authService.setRedirectUrl(String(url));
    this.router.navigate([this.authService.getLoginUrl()]);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
