import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GUEST_TYPE } from '../common/types';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from './callAPI/call-api.service';
import { map } from 'rxjs';

const apiURL = environment.API_URL + 'guest/'


@Injectable({
  providedIn: 'root'
})
export class GuestService {

  guest: GUEST_TYPE = {}
  guests: GUEST_TYPE[] = []
  guest_id: any

  constructor(private callApiService: CallApiService) { }

  fetchGuestById = async (_id: any) => {
    const result = await this.callApiService.get(_id)
    result.subscribe(sub => {
      console.log('fetchGuestById: ', sub)
      this.guest = sub
      this.setGuest(sub)
    })
  }

  fetchAllGuestsByHotelId = async (hotel_id: any) => {
    const result = await this.callApiService.get('all/hotel/' + hotel_id)
    result.pipe(
      map((data: any) => {

        return data
      })
    )
      .subscribe((sub: any) => {
        console.log('fetchAllGuetsByHotelId: ', sub)
        this.getGuests = sub
        this.setGuest(sub)
      })
  }

  postCreateGuestByHotelId = async (hotel_id: any, data: GUEST_TYPE) => {
    const result = await this.callApiService.post(`guest/create/hotel/${hotel_id}`, data)
    result.pipe(
      map((data: any) => {
        this.guest = data
        console.log('this guest:', this.guest)
        //this.guest_id = this.guest._id
        return data
      })
    ).subscribe(sub => {
      console.log("postCreateGuestByHotelId: ", sub)
      this.guest_id = sub._id
    })
  }

  getGuests = () => this.guests

  setGuests = (guests: GUEST_TYPE[]) => { this.guests = guests }

  getGuest = () => this.guest

  setGuest = (guest: GUEST_TYPE) => { this.guest = guest }
}
