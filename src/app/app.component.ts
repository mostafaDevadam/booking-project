import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { StorageService } from './services/storage.service';
import { HotelService } from './services/hotel.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  menuOpen: boolean = false

  constructor(private authService: AuthService, private router: Router,

    private menu: MenuController,
    private platform: Platform,
    private storageService: StorageService,
    private hotelService: HotelService,
    private userService: UserService,


  ) { }

  async ngOnInit() {
    console.log("start app")

    const token = await localStorage.getItem('ION_TOKEN')
    console.log("token:", token)


    if (token) {

      this.authService.setIsUserLoggedIn(true)
      this.authService.setRedirectUrl('/home')
    }


    this.userService.CheckAndFetchUser()


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

  logout() {

  }
}
