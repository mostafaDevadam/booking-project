import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BOOKING_TYPE, NOTE_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { RoomService } from 'src/app/services/room.service';
import { MessageDialogModalComponent } from 'src/app/shared/components/message-dialog-modal/message-dialog-modal.component';
import { NoteService } from 'src/app/services/note.service';
import { FormControl, FormGroup } from '@angular/forms';
import { eAUTHOR_ROLE_ENUM } from 'src/app/common/enums';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  hotel_id: any
  selectedBooking: BOOKING_TYPE
  currentBooking: BOOKING_TYPE

  isModalOpen = false;
  noteForm: FormGroup

  constructor(
    private hotelService: HotelService,
    public bookingService: BookingService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    public roomService: RoomService,
    private toastCtrl: ToastController,
    private noteService: NoteService,
    private userService: UserService,


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
      this.initNoteForm()
    }
  }


  ionViewWillEnter() {
    console.log('----ionViewWillEnter-----')
    this.initialize()

  }


  initNoteForm() {
    this.noteForm = new FormGroup({
      content: new FormControl<string>(''),
      isPublic: new FormControl<Boolean>(false)
    })
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

  selectBooking(item: BOOKING_TYPE) {
    this.currentBooking = item
    console.log("currentBooking: ", this.currentBooking)

  }

  async createNote(item: BOOKING_TYPE) {
    const user = this.userService.currentUser
    if (this.noteForm.value && user._id == item.hotel) {

      const data: NOTE_TYPE = {
        author_role: eAUTHOR_ROLE_ENUM.Hotel,
        author: item.hotel,
        content: this.noteForm.value.content,
        //isPublic: false,
        booking: item._id,
      }
      console.log("create note obj:", data)
      await this.noteService.postCreateOneByBookingId(item._id, data)
    }

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }




  async submitNoteForm() {
    // const user = this.userService.currentUser


    if (this.noteForm.value && this.currentBooking) {
      console.log("submitNoteForm: ", this.noteForm.value)
      const user = this.userService.currentUser

      /*
            const data: NOTE_TYPE = {
              _id: this.currentBooking._id,
              author_role: this.currentNote.author_role,
              author: this.currentNote.author,
              content: this.noteForm.value.content,
              isPublic: this.noteForm.value.isPublic,
              booking: this.currentNote.booking,
            }
            */

      //console.log("update note obj:", data)
      //  await this.noteService.updateById(this.currentNote._id, data)
      await this.createNote(this.currentBooking)

      this.setOpen(false)

    }

  }

}
