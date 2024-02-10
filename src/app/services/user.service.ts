import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HotelService } from './hotel.service';
import { ROLE_ENUM } from '../common/enums';
import { GuestService } from './guest.service';
import { keys } from '../common/keys';
import { AUTH_INPUTS_TYPE } from '../common/types';
import { CallApiService } from './callAPI/call-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  role: string = ''
  currentUser: any
  currentUserID: any

  constructor(
    private storageService: StorageService,
    private hotelService: HotelService,
    private guestService: GuestService,
    private callApiService: CallApiService

  ) { }


  CheckAndFetchUser = async () => {
    const user = await this.storageService.getItem(keys.ION_USER)
    if (user) {
      console.log('ion_user: ', user.role)
      this.currentUser = user
      this.currentUserID = user._id
      //this.authService.setRole(user.role)
      this.setRole(user.role)
      /*if (user.role == 'hotel') {
        await this.hotelService.fetchHotelById(user._id)
      }*/
      this.fetchUserByID(user._id)
    }
  }

  setRole(role: ROLE_ENUM) {
    this.role = role;
  }

  getRole = () => this.role

  async fetchUserByID(_id: any) {
    if (this.role === ROLE_ENUM.hotel) {
      this.hotelService.fetchHotelById(_id)
    } else if (this.role === ROLE_ENUM.guest) {
      this.guestService.fetchGuestById(_id)
    }
  }

  postSignUp = async (inputs: AUTH_INPUTS_TYPE): Promise<any> => {
    return await this.callApiService.post('auth/signup', inputs)
  }


  postSignIn = async (inputs: AUTH_INPUTS_TYPE) => {
    return await this.callApiService.post('auth/signin', inputs)
  }


}
