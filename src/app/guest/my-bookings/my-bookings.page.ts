import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GuestService } from '../../services/guest.service';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { BOOKING_TYPE, HOTEL_TYPE, MODAL_UI_PROPS, MY_BOOKING_MODAL_PROPS } from 'src/app/common/types';
import { ModalController } from '@ionic/angular';
import { MyBookingModalComponent } from './components/my-booking-modal/my-booking-modal.component';
import { ROLE_MODAL_UI_ENUM } from 'src/app/common/enums';
import { HotelService } from 'src/app/services/hotel.service';


type M_TYPE = {
  [key: string]: string
}

type M_TYPE_<T> = {
  [key: string]: T
}

type M_TYPE_T<T> = {
  [k in keyof T]: T;
};

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit {
  // user-service, auth-service, guest-service, booking-service
  myBookings: BOOKING_TYPE[]
  guest_id: any
  hotels: HOTEL_TYPE[]

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private guestService: GuestService,
    private bookingService: BookingService,
    private modalCtrl: ModalController,
    private hotelService: HotelService,
  ) { }

  async ngOnInit() {
    console.log("---MyBookingsPage---")
    if (this.userService.currentUser.role === 'guest') {
      console.log("user role is guest")
      this.myBookings = this.bookingService.myBookingsByGuestId
      console.log("myBookings: ", this.myBookings)
      this.guest_id = this.guestService.getGuestId()
      // fetch all hotels
      await this.hotelService.fetchAllHotels()
        .then(th => th.subscribe((sub) => {
          console.log("hotels sub: ", sub)
        }))
      //
      this.bookingService.myBookingsListByGuestId.asObservable()
        .subscribe((sub) => {
          this.myBookings = sub
          console.log("myBookingsListByGuest sub: ", sub)
        })

    }

  }


  // presentModal() -> new-booking-form -> display hotels list -> hotel (_id)-> rooms -> room(_id)

  showCreateMyBookingModal = () => {

    if (this.userService.currentUser.role === 'guest') {
      this.hotelService.all_hotels.asObservable()
        .subscribe((sub) => {
          console.log("all hotels: ", sub)
          this.hotels = sub
        })

      console.log("user role is guest")
      const prop: MY_BOOKING_MODAL_PROPS<BOOKING_TYPE> = {
        role: ROLE_MODAL_UI_ENUM.create,
        booking: { guest: this.guest_id }
      }

      this.presentModal(MyBookingModalComponent, { role: "create", booking: { guest: this.guest_id }, hotels: this.hotels })
    }

  }

  showEditMyBookingModal = async (item: BOOKING_TYPE) => {
    if (this.userService.currentUser.role === 'guest') {
      await this.bookingService.fetchBookingById(item._id)
      this.hotelService.all_hotels.asObservable()
        .subscribe((sub) => {
          console.log("all hotels: ", sub)
          this.hotels = sub
        })

      this.presentModal(MyBookingModalComponent, { role: "edit", booking: item, hotels: this.hotels })
    }

  }

  showViewMyBookingModal = async (item: BOOKING_TYPE) => {
    if (this.userService.currentUser.role === 'guest') {
      await this.bookingService.fetchBookingById(item._id)
      this.presentModal(MyBookingModalComponent, { role: "view", booking: item })
    }

  }

  presentModal = async (component: any, props: any) => {
    const modal = await this.modalCtrl.create({
      component,
      componentProps: { props },
    })

    await modal.present()


  }

  saveCreateMyBookingCallback = () => {

  }

  saveEditMyBookingCallback = () => {

  }


}
