import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';

export const myBookingsResolver: ResolveFn<boolean> = async (route, state): Promise<boolean>  => {
  const g = inject(GuestService).getGuestId()
  if (g) {
    await inject(BookingService).fetchAllBookingsByGuestId(g)
    // fetchAllHotels
   // const hotels = await inject(HotelService).fetchAllHotels()


  }


  return true;
};
