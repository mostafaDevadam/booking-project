import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { ROLE_FORM_ENUM } from 'src/app/common/enums';
import { BOOKING_TYPE, HOTEL_TYPE, ROOM_TYPE } from 'src/app/common/types';
import { BookingService } from 'src/app/services/booking.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-my-booking-form',
  templateUrl: './my-booking-form.component.html',
  styleUrls: ['./my-booking-form.component.scss'],
})
export class MyBookingFormComponent implements OnInit {
  @Input() role: ROLE_FORM_ENUM

  @Input() isCreate: boolean = false
  @Input() isEdit: boolean = false
  @Input() booking: BOOKING_TYPE
  @Input() hotels: HOTEL_TYPE[]

  rooms: ROOM_TYPE[]

  isSelectedHotel: boolean = false
  isSelectedRoom: boolean = false

  currentHotel: HOTEL_TYPE
  currentRoom: ROOM_TYPE

  fetchedBooking: BOOKING_TYPE



  public bookingForm: FormGroup

  roomService = inject(RoomService)
  bookingService = inject(BookingService)

  constructor() { }

  async ngOnInit() {
    console.log("---MyBookingFormComponent ----")
    console.log("form role: ", this.isCreate, this.isEdit, this.role)
    this.initialize()
  }

  initialize = () => {
    if (this.isCreate) {
      console.log("booking: ", this.booking, this.hotels)

      this.bookingForm = new FormGroup({
        nights: new FormControl({value: '', disabled: true}),
        start_date: new FormControl<string>('', Validators.required),
        end_date: new FormControl<string>('', Validators.required),
        room: new FormControl(),
        hotel: new FormControl(),
        guest: new FormControl(this.booking?.guest)

      })

    } else if( this.isEdit && this.booking) {
      console.log("booking: ", this.booking)

      this.bookingService.myBooking.asObservable()
      .pipe(map((data: any) => {
        this.fetchedBooking = data
        return data
      }))
      .subscribe((sub) => {
        console.log("myBooking asObservable sub: ", sub)

      })

      this.bookingForm = new FormGroup({
        _id: new FormControl<any>(this.fetchedBooking._id),
        nights: new FormControl<string>(this.fetchedBooking.nights),
        start_date: new FormControl(this.fetchedBooking.start_date),
        end_date: new FormControl(this.fetchedBooking.end_date),
        isCheckedIn: new FormControl<boolean>(false),
        isCheckedOut: new FormControl<boolean>(false),
        isConfirmed: new FormControl<boolean>(false),
        isPaid: new FormControl<boolean>(false),
        checkedIn_date: new FormControl<string>(''),
        checkedOut_date: new FormControl<string>(''),
        confirmed_date: new FormControl<string>(''),
        paid_date: new FormControl<string>(''),
        room: new FormControl(this.fetchedBooking.room?._id),
        hotel: new FormControl(this.fetchedBooking.hotel),
        guest: new FormControl(this.fetchedBooking?.guest)

      })

      console.log("edit init form booking: ", this.bookingForm.value, this.fetchedBooking)

    }
  }

  submit = async () => {
    console.log("submit form")
    if (this.isCreate && this.bookingForm.value) {
      console.log("submit create booking ", this.bookingForm.value)
      this.bookingService.postCreateBookingByHotelIdAndRoomIdAndGuestId(
            this.bookingForm.value.hotel,
            this.bookingForm.value.room,
            this.booking.guest,
            this.bookingForm.value,

        )
    } else if (this.isEdit) {
      console.log("submit edit booking")
    }
  }

  selectHotel = async () => {
    console.log("selectHotel: ", this.bookingForm.value.hotel)
    //this.bookingForm.patchValue({ 'hotel':  })
    this.isSelectedHotel = true
    // fetchAllAvailableRoomsByHotelId
    await this.roomService.fetchAllAvailableRoomsByHotelId(this.bookingForm.value.hotel)
    this.roomService.freeRooms.asObservable().subscribe((sub) => {
      console.log("asObservable free rooms by hotel_id", sub)
      this.rooms = sub
    })

    console.log("free rooms by hotelId:", this.rooms)
    //this.bookingForm.patchValue({ 'nights':  })

  }

  selectRoom = () => {
    console.log("selectRoom: ", this.bookingForm.value.room)
  }

  calculateNights = (start: any, end: any) => {
    let s = new Date(start)
    let e = new Date(end)
    let st = s.getTime()
    let et = e.getTime()
    if(et > st){
    let timeDiff = Math.abs(et - st )
        if (timeDiff) {
          let numOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24))
          if (numOfNights) {
            console.log("numOfNights: ", numOfNights)
            return numOfNights
          }
        }
    }
    return

  }

  checkChangeStartDate = () => {
    if (this.bookingForm.value) {
      let start = this.bookingForm.value.start_date
      let end = this.bookingForm.value.end_date
      if (start && end) {
        console.log("start date:", start, end)
        const numOfNights = this.calculateNights(start, end) && this.calculateNights(start, end)
        this.bookingForm.patchValue({ 'nights': numOfNights }) // this.calculateNights(start, end)
      }
    }
  }

  checkChangeEndDate = () => {
    if (this.bookingForm.value) {
      let start = this.bookingForm.value.start_date
      let end = this.bookingForm.value.end_date
      if (start && end) {
        console.log("end date:", start, end)
        const numOfNights = this.calculateNights(start, end) && this.calculateNights(start, end)
        this.bookingForm.patchValue({ 'nights': numOfNights })
      }
    }
  }



}
