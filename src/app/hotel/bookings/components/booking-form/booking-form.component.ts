import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BOOKING_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit {

  @Input() data: any

  public bookingForm: any

  public isChangeRoom: boolean = false

  constructor(
    private hotelService: HotelService,
    public bookingService: BookingService,
    private guestService: GuestService,
    public roomService: RoomService,
    public modalCtrl: ModalController,

  ) { }

  ngOnInit() {
    console.log("---BookingFormComponent ----")
    console.log("edit booking data: ", this.data)
    this.init()
  }

  init = () => {

    if (this.data) {
      this.bookingForm = new FormGroup({
        _id: new FormControl(this.data._id),
        nights: new FormControl<string>(this.data.nights),
        start_date: new FormControl<string>(this.data.start_date),
        end_date: new FormControl<string>(this.data.end_date),
        isCheckedIn: new FormControl<boolean>(this.data.isCheckedIn || false),
        isCheckedOut: new FormControl<boolean>(this.data.isCheckedOut || false),
        isConfirmed: new FormControl<boolean>(this.data.isConfirmed || false),
        isPaid: new FormControl<boolean>(this.data.isPaid || false),
        checkedIn_date: new FormControl<string>(this.data.checkedIn_date),
        checkedOut_date: new FormControl<string>(this.data.checkedOut_date),
        confirmed_date: new FormControl<string>(this.data.confirmed_date),
        paid_date: new FormControl<string>(this.data.paid_date),
        room: new FormControl(this.bookingService.booking.room._id ||this.data.room._id || ''),
        hotel: new FormControl(this.hotelService.getHotelId() || this.data.hotel),
        guest: new FormControl(this.data.guest || '')

      })
    }



  }

  submit() {
    const data: BOOKING_TYPE = {}
    this.bookingService.setPreEditBooking(data)
    this.modalCtrl.dismiss(this.bookingForm.value, 'edit-booking-form')

  }

  changeRoom = async () => {

    console.log("change Room: ", this.bookingForm.value.room)
    await this.bookingService.patchChangeRoomInBooking(this.bookingForm.value._id, this.bookingForm.value.room)

  }

}
