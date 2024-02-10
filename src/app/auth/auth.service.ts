import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { User } from '../shared/user';
import { environment } from 'src/environments/environment';
import { ROLE_ENUM } from '../common/enums';
import { AUTH_INPUTS_TYPE } from '../common/types';
import { HotelService } from '../services/hotel.service';
import { keys } from '../common/keys';
import { UserService } from '../services/user.service';
import { GuestService } from '../services/guest.service';


const USERS = [
  new User(1, 'rajesh', 'ra123', 'ADMIN'),
  new User(2, 'mohan', 'mo123', 'ADMIN')
];
let usersObservable = of(USERS);

const apiUrl: string = environment.API_URL || 'http://localhost:5001/api/v0/'


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private isAuth: boolean = false;
  private authToken = "4521djgkgolr78_':;mnjbkg"
  private TOKEN = "TOKEN"
  private role: string = ''
  //
  private redirectUrl: string = '/';
  private loginUrl: string = '/auth';
  private isloggedIn: boolean = false;
  private loggedInUser = {};

  constructor(
    private http: HttpClient,
    private hotelService: HotelService,
    private userService: UserService,
    private guestService: GuestService,

  ) { }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    console.log("start auth service")

    /*const token = await localStorage.getItem('ION_TOKEN')
    console.log("auth service token:", token)*/

  }



  getAllUsers(): Observable<User[]> {
    return usersObservable;
  }

  async signUp({ role, email, password }: AUTH_INPUTS_TYPE) {

  }

  async signIn({ role, email, password }: AUTH_INPUTS_TYPE): Promise<Observable<boolean>> {

    this.role = role

    //const result2 = await this.userService.postSignIn({ role: role, email: email, password: password })
    const result = await this.http.post(apiUrl + 'auth/signin', { role: role, email: email, password: password })
    //result.subscribe(sub => console.log(sub))
    return result.pipe(
      map((user: any) => {
        console.log("user:", user)
        if (user.payload) {
          const data = { role, ...user.payload }
          const obj = JSON.stringify(data)
          localStorage.setItem(keys.ION_USER, obj)
          localStorage.setItem(keys.ION_TOKEN, user.payload.access_token)
          // change to userService
          if(role === ROLE_ENUM.hotel){
              this.hotelService.fetchHotelById(user.payload._id)
          } else if(role === ROLE_ENUM.guest) {
            this.guestService.fetchGuestById(user.payload._id)
          }

          this.userService.setRole(role)
          this.userService.fetchUserByID(user.payload._id)

          this.isloggedIn = true
          this.loggedInUser = user.payload
        } else {
          this.isloggedIn = false
        }
        return this.isloggedIn
        //return {_id: user.payload._id,token: user.payload.access_token}
      })
    ) //.subscribe( sub => console.log(sub))

  }

  singOut = () => {
    localStorage.removeItem(keys.ION_USER)
    localStorage.removeItem(keys.ION_TOKEN)
    //this.userService.setRole('')
    //this.userService.fetchUserByID(user.payload._id)
    this.isloggedIn = false
    this.loggedInUser = {}
    this.userService.currentUser = null
  }

  isUserAuthenticated(username: string, password: string): Observable<boolean> {
    // console.log(environment.API_URL.toString())
    //const s = this.signIn(email, password) //.then(th => console.log(th))

    return this.getAllUsers().pipe(
      map((users: any) => {
        let user = users.find((user: any) => (user.username === username) && (user.password === password));
        if (user) {
          this.isloggedIn = true;
          this.loggedInUser = user;
        } else {
          this.isloggedIn = false;
        }
        return this.isloggedIn;
      }))
  }

  isUserLoggedIn(): boolean {
    return this.isloggedIn;
  }
  setIsUserLoggedIn(val: boolean) {
    this.isloggedIn = val;
  }
  getRedirectUrl(): string {
    return this.redirectUrl;
  }
  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }
  getLoginUrl(): string {
    return this.loginUrl;
  }
  getLoggedInUser(): any {
    return this.loggedInUser;
  }
  logoutUser(): void {
    this.isloggedIn = false;
  }

  setRole(role: string): void {
    this.role = role
  }
  getRole() {
    return this.role
  }

}
