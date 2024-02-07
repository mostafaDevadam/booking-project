import { Injectable } from '@angular/core';
import { CallApiService } from './callAPI/call-api.service';
import { map } from 'rxjs';
import { BOOKING_TYPE } from '../common/types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingsByHotel: BOOKING_TYPE[] = []
  editBooking: BOOKING_TYPE
  preEditBooking: BOOKING_TYPE
  currentBooking: BOOKING_TYPE
  booking: BOOKING_TYPE

  msgRemoved: string = ''
  isRemoved: boolean = false

  constructor(
    private callAPiService: CallApiService,
  ) { }


  fetchAllBookingsByHotelId = async (hotel_id: any) => {
    const result = await this.callAPiService.get('booking/all/hotel/' + hotel_id);
    result.pipe(
      map((list: any): BOOKING_TYPE[] => {
        this.bookingsByHotel = list
        return Array<BOOKING_TYPE>(list)
      })
    ).subscribe((sub) => console.log("fetchAllBookingsByHotelId: ", sub))
  }


  postCreateBookingByHotelIdAndRoomIdAndGuestId = async (hotel_id: any, room_id: any, guest_id: any, data: Partial<BOOKING_TYPE>) => {
    const result = await this.callAPiService.post(`booking/hotel/${hotel_id}/room/${room_id}/guest/${guest_id}`, data);
    result.pipe(
      map((data: any): BOOKING_TYPE[] => {
        return data
      })
    ).subscribe((sub) => console.log("postCreateBookingByHotelIdAndRoomIdAndGuestId: ", sub))
  }

  fetchBookingById = async (_id: any) => {
    const result = await this.callAPiService.get(`booking/${_id}`)
    result.pipe(map((data: any) => {
      this.booking = data
      return data
    }))
      .subscribe((sub) => {
        this.booking = sub
        console.log(" fetchBookingById:", sub)
      })
  }

  patchUpdateBookingById = async (_id: any, data: BOOKING_TYPE) => {
    const result = await this.callAPiService.patch(`booking/${_id}`, data)
    result.pipe(map((data: any) => {
      return data
    }))
      .subscribe((sub) => console.log(" patchUpdateBookingById:", sub))
  }

  patchChangeRoomInBooking = async (booking_id: any, room_id: any) => {
    const result = await this.callAPiService.patch(`booking/${booking_id}/change/room/${room_id}`, null)
    result.pipe(map((data: any) => {

      return data
    }))
      .subscribe((sub) => console.log(" patchChangeRoomInBooking:", sub))
  }

  deleteBookingByIdAndRoomId = async (booking_id: any, room_id: any) => {
    const result = await this.callAPiService.remove(`booking/${booking_id}/room/${room_id}`)
    return result.pipe(map((data: any) => {
      if (data.error) {
        this.msgRemoved = data.error
        this.isRemoved = false
        return data
      }
      this.isRemoved = true
      return data
    }))

      //.subscribe((sub) => console.log(" deleteBookingById:", sub))
  }

  setPreEditBooking = (el: BOOKING_TYPE) => {
    // this.editBooking = el
    //this.preEditBooking = el
  }




}
