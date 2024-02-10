import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { StorageService } from './services/storage.service';
import { HotelService } from './services/hotel.service';
import { UserService } from './services/user.service';
import { HOTEL_TYPE } from './common/types';
import { register } from 'swiper/element/bundle';
import { GuestService } from './services/guest.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  menuOpen: boolean = false

  hotel: HOTEL_TYPE
  public currentUser: any

  constructor(public authService: AuthService, private router: Router,

    private menu: MenuController,
    private platform: Platform,
    private storageService: StorageService,
    public hotelService: HotelService,
    private userService: UserService,
    private guestService: GuestService,



  ) { }

  async ngOnInit() {
    console.log("start app")

    const token = await localStorage.getItem('ION_TOKEN')
    console.log("token:", token)


    if (token) {
      this.authService.setIsUserLoggedIn(true)
      //this.authService.setRedirectUrl('/home')
    }

    await this.userService.CheckAndFetchUser()
    this.currentUser = this.userService.currentUser
    if (this.currentUser) {
      console.log("user this.currentUser: ", this.currentUser)
      if (this.currentUser.role) {
        this.authService.setRole(this.currentUser.role)
        console.log("user auth role: ", this.authService.getRole())
        // auth role
        if (this.authService.getRole() === 'hotel') {
           this.hotelService.fetchHotelById(this.currentUser._id)
          console.log("user auth role hotel: ", this.authService.getRole())
          this.authService.setRedirectUrl('/home')
        } else if (this.authService.getRole() === 'guest') {
           this.guestService.fetchGuestById(this.currentUser._id)
          console.log("user auth role guest: ", this.authService.getRole())
          this.authService.setRedirectUrl('/home-guest')
        }
      }

    }


  }

  async ionViewWillEnter() {
    await this.userService.CheckAndFetchUser()
    this.currentUser = this.userService.currentUser
    //this.hotel = this.hotelService.getHotel()

    if (this.currentUser) {
      this.authService.setRole(this.currentUser.role)
      console.log("user currentUser: ", this.currentUser)
    }

  }

  CheckAndFetchUser = async () => {
    const user = await this.storageService.getItem('ION_USER')

    if (user) {
      console.log('ion_user: ', user.role)
      this.authService.setRole(user.role)

      if (user.role == 'hotel') {
        await this.hotelService.fetchHotelById(user._id)
      }

    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
      }
    });
  }

  notify() {
    this.menuOpen = !this.menuOpen
    console.log("menu: ", this.menuOpen)
  }

  SignOut = () => {
    this.authService.singOut()
  }

  logout() {

  }
}
