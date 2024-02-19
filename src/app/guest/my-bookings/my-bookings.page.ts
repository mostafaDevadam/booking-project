import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { GuestService } from '../../services/guest.service';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';
import { ALERT_PROPS, BOOKING_TYPE, FEEDBACK_TYPE, HOTEL_TYPE, MODAL_UI_PROPS, MY_BOOKING_MODAL_PROPS, NOTE_TYPE } from 'src/app/common/types';
import { AlertController, ModalController } from '@ionic/angular';
import { MyBookingModalComponent } from './components/my-booking-modal/my-booking-modal.component';
import { ROLE_MODAL_UI_ENUM, eAUTHOR_ROLE_ENUM } from 'src/app/common/enums';
import { HotelService } from 'src/app/services/hotel.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { NoteService } from 'src/app/services/note.service';


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

  public new_feedback_text: any
  new_note_text: any


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private guestService: GuestService,
    private bookingService: BookingService,
    private modalCtrl: ModalController,
    private hotelService: HotelService,
    private alertCtrl: AlertController,
    private feedbackService: FeedbackService,
    private noteService: NoteService,

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
      // fetchAllNotesByBookingId and pass it to Modal-UI
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

  async createNote(item: BOOKING_TYPE) {
    const user = this.userService.currentUser
    if (this.new_note_text && user._id == item.guest) {

      const data: NOTE_TYPE = {
        author_role: eAUTHOR_ROLE_ENUM.Guest,
        author: item.guest,
        content: this.new_note_text,
        booking: item._id,
      }
      console.log("create note obj:", data)
      await this.noteService.postCreateOneByBookingId(item._id, data)


    }

  }

  async createFeedback(item: BOOKING_TYPE) {
    const user = this.userService.currentUser

    if (this.new_feedback_text && user._id == item.guest) {
      console.log("create feedback:", item, this.new_feedback_text, user)
      const data: FEEDBACK_TYPE = {
        content: this.new_feedback_text,
        guest: item.guest,
        hotel: item.hotel,
      }
      console.log("create feedback obj:", data)
      await this.feedbackService.postCreateOneByGuestIdAndHotelId(item.guest, item.hotel, data)
    }

  }

  async openAlert(state: string, item: BOOKING_TYPE) {
    if (state === 'feedback') {
      await this.presentAlert<BOOKING_TYPE>(state, item,
        {
          header: 'Feedback',
          subHeader: 'Write My Feedback',
          message: 'Create A New FeedBack for the Hotel'
        }, 'Write your Feedback here...')
    } else if (state === 'note') {
      await this.presentAlert<BOOKING_TYPE>(state, item, {
        header: 'Note',
        subHeader: 'Write My Note',
        message: 'Create A New Note for My Booking'
      }, 'Write your note here...',
        {
          label: 'Public',
          type: 'radio',
         // value: false,
        }
      )
    }
  }

  async presentAlert<T>(state: string, item: T, props: ALERT_PROPS, placeholder?: string, inputs?: any) {

    const alert = await this.alertCtrl.create({
      /*header: 'Feedback',
      subHeader: 'Write My Feedback',
      message: 'Create A New FeedBack for the Hotel',*/
      ...props,
      buttons: [
        {
          text: 'close',
        },
        {
          text: 'Save',
          handler: async (value) => {

            console.log("save btn note:", value[0], this.new_feedback_text)
            //await this.createFeedback(item)
            if (state === 'feedback') {
              this.new_feedback_text = value[0]
              const d: BOOKING_TYPE = <BOOKING_TYPE>item
              await this.createFeedback(d)
            } else if (state === 'note') {
              this.new_note_text = value[0]
              const n: BOOKING_TYPE = <BOOKING_TYPE>item
              await this.createNote(n)
            }



          },
        }

      ],
      inputs: [
        /*{
          label: 'Public',
          type: 'radio',
          //value: 'false',
          checked: false

        },*/
        {
          label: 'Note',
          value: this.new_feedback_text,
          attributes: {

          },
          type: 'textarea',
          placeholder,
          handler: (input) => {
            console.log("alert input textarea: ", input)

          },


        },
        {
          label: 'Public',
          type: 'radio',
          value: 'false',
          checked: false

        }
      ],


    })

    await alert.present()

  }

  async pres<T>(state: string, item: T) {

    if (state === 'feedback') {
      const d: BOOKING_TYPE = <BOOKING_TYPE>item
      await this.createFeedback(d)
    } else if (state === 'note') {
      const n: BOOKING_TYPE = <BOOKING_TYPE>item
      await this.createNote(n)
    }
  }


}
