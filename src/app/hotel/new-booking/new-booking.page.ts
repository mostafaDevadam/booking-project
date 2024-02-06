import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { GENDER_ENUM } from 'src/app/common/enums';
import { BOOKING_TYPE, GUEST_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.page.html',
  styleUrls: ['./new-booking.page.scss'],
})
export class NewBookingPage implements OnInit {

  public isNextForm: boolean = false

  public guestForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    birth_date: new FormControl(''),
    gender: new FormControl(GENDER_ENUM.male),
    hotel: new FormControl(this.hotelService.getHotelId()),
  })

  public bookingForm = new FormGroup({
    nights: new FormControl<string>(''),
    start_date: new FormControl<string>(''),
    end_date: new FormControl<string>(''),
    isCheckedIn: new FormControl<boolean>(false),
    isCheckedOut: new FormControl<boolean>(false),
    isConfirmed: new FormControl<boolean>(false),
    isPaid: new FormControl<boolean>(false),
    checkedIn_date: new FormControl<string>(''),
    checkedOut_date: new FormControl<string>(''),
    confirmed_date: new FormControl<string>(''),
    paid_date: new FormControl<string>(''),
    room: new FormControl(''),
    hotel: new FormControl(this.hotelService.getHotelId()),
    guest: new FormControl('')

  })

  gender_keys = Object.keys(GENDER_ENUM)

  lbls: { [key in GENDER_ENUM]: GENDER_ENUM } = {
    male: GENDER_ENUM.male,
    female: GENDER_ENUM.female,
  }

  getGender = (t: GENDER_ENUM) => this.lbls[t]


  constructor(
    private hotelService: HotelService,
    private bookingService: BookingService,
    private guestService: GuestService,
    public roomService: RoomService,
  ) { }

  ngOnInit() {
    console.log("---------")
    this.init()

  }

  async init() {
    await this.roomService.fetchAllAvailableRoomsByHotelId(this.hotelService.getHotelId())
    //this.bookingForm.valueChanges.subscribe( sub => sub.room = '' )
  }

  async submitGuest() {
    this.isNextForm = true

    const data = {
      name: this.guestForm.value.name,
      email: this.guestForm.value.email,
      birth_date: this.guestForm.value.birth_date,
      gender: this.guestForm.value.gender || GENDER_ENUM.male,
      hotel: this.hotelService.getHotelId(),
    }

    const inputs: Partial<GUEST_TYPE> = data

    console.log("guest form: ", this.guestForm.value, data)


    await this.guestService.postCreateGuestByHotelId(this.hotelService.getHotelId(), inputs)

    const g = this.guestService.guest_id



    console.log('guest:', g)

  }

  async submitBooking() {
    console.log('guest:', this.guestService.getGuest(), this.guestService.guest_id)

    this.bookingForm.patchValue({ 'guest': this.guestService.guest_id });
    console.log("booking form: ", this.bookingForm.value);


    const data: Partial<BOOKING_TYPE> = {
      nights: this.bookingForm.value.nights,
      start_date: this.bookingForm.value.start_date || '',
      end_date: this.bookingForm.value.end_date || '',
      isCheckedIn: Boolean(this.bookingForm.value.isCheckedIn),
      isCheckedOut: Boolean(this.bookingForm.value.isCheckedOut),
      isConfirmed: Boolean(this.bookingForm.value.isConfirmed),
      isPaid: Boolean(this.bookingForm.value.isPaid),
      checkedIn_date: this.bookingForm.value.checkedIn_date || '',
      checkedOut_date: this.bookingForm.value.checkedOut_date || '',
      confirmed_date: this.bookingForm.value.confirmed_date || '',
      paid_date: this.bookingForm.value.paid_date || '',
      room: this.bookingForm.value.room,
      guest: this.guestService.guest_id

    }




    this.bookingService.postCreateBookingByHotelIdAndRoomIdAndGuestId(
      this.hotelService.getHotelId(),
      this.bookingForm.value.room,
      this.guestService.guest_id,
      data,

    )

    this.guestForm.reset()
    this.bookingForm.reset()
    this.isNextForm = false
  }

}
