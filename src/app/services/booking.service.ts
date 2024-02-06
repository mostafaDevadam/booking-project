import { Injectable } from '@angular/core';
import { CallApiService } from './callAPI/call-api.service';
import { map } from 'rxjs';
import { BOOKING_TYPE } from '../common/types';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingsByHotel: BOOKING_TYPE[] = []

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




}
