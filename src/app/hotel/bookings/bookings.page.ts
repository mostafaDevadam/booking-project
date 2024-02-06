import { Component, OnInit } from '@angular/core';
import { BOOKING_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  hotel_id: any

  constructor(
    private hotelService: HotelService,
    public bookingService: BookingService,

  ) { }

  ngOnInit(): void {
    console.log("bookings")
    this.initialize()
  }

  initialize() {
    if (this.hotelService.getHotelId()) {
      this.hotel_id = this.hotelService.getHotelId()
      this.bookingService.fetchAllBookingsByHotelId(this.hotel_id)

    }
  }

  ionViewWillEnter() {
    console.log('----ionViewWillEnter-----')
    this.initialize()

  }


  selectedBooking = (booking: BOOKING_TYPE) => {
    console.log('selected Booking: ', booking)

  }

}
