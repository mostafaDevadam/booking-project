import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BOOKING_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { RoomService } from 'src/app/services/room.service';
import { MessageDialogModalComponent } from 'src/app/shared/components/message-dialog-modal/message-dialog-modal.component';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  hotel_id: any
  selectedBooking: BOOKING_TYPE

  constructor(
    private hotelService: HotelService,
    public bookingService: BookingService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public roomService: RoomService,
    private toastCtrl: ToastController,

  ) { }

  ngOnInit(): void {
    console.log("bookings")
    this.initialize()
  }

  async initialize() {
    if (this.hotelService.getHotelId()) {
      this.hotel_id = this.hotelService.getHotelId()
      this.bookingService.fetchAllBookingsByHotelId(this.hotel_id)
      await this.roomService.fetchAllAvailableRoomsByHotelId(this.hotelService.getHotelId())
    }
  }

  ionViewWillEnter() {
    console.log('----ionViewWillEnter-----')
    this.initialize()

  }




  fetchBookingById = async (_id: any) => {
    await this.bookingService.fetchBookingById(_id)
  }

  viewBooking = (el: BOOKING_TYPE) => {
    this.fetchBookingById(el._id)
    console.log("view...")
    this.presentModal(BookingModalComponent, { role: 'view', booking: el })

  }

  editBooking = (el: BOOKING_TYPE) => {
    this.fetchBookingById(el._id)
    console.log("edit...")
    this.presentModal(MessageDialogModalComponent, { role: 'edit', booking: el })
  }

  removeBooking = (el: BOOKING_TYPE) => {
    this.selectedBooking = el
    this.presentAlert()
  }

  handleRemove = async (val: boolean, el: BOOKING_TYPE) => {
    if (val && el) {
      console.log("alert confirm remove booking : ", val)
      await this.bookingService.deleteBookingByIdAndRoomId(this.selectedBooking._id, this.selectedBooking.room)
        .then(th => th.subscribe((sub) => {
          console.log('sub remove booking:', sub)
          this.presentToast('remove booking')
        }))
    }
  }

  presentToast = async (msg: string) => {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top',

    })

    await toast.present()
  }

  presentAlert = async () => {
    const alert = await this.alertCtrl.create({
      header: 'Do you want remove it?',
      message: '',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => this.handleRemove(false, {})
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: () => this.handleRemove(true, {})
      }
      ],


    })

    await alert.present()

  }

  presentModal = async (component: any, props: any) => {
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { props: props },

    })

    //const {data, role} = await modal.onWillDismiss()
    this.getDataFromModal(modal)




    return await modal.present()

  }

  getDataFromModal = async (modal: any) => {
    const { data, role } = await modal.onWillDismiss()

    console.log("modal data:", data, role)

    if (data) {
      await this.bookingService.patchUpdateBookingById(data._id, data)
    }

  }

}
