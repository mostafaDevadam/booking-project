import { Component, Input, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ROLE_FORM_ENUM } from '../../../../common/enums';
import { BookingService } from 'src/app/services/booking.service';
import { map } from 'rxjs';
import { BOOKING_TYPE } from 'src/app/common/types';

@Component({
  selector: 'app-my-booking-modal',
  templateUrl: './my-booking-modal.component.html',
  styleUrls: ['./my-booking-modal.component.scss'],
})
export class MyBookingModalComponent implements OnInit {

  @Input() props: any

  isCreate: boolean = false
  isEdit: boolean = false
  isView: boolean = false

  public role_form = ROLE_FORM_ENUM

  bookingService = inject(BookingService)

  booking: BOOKING_TYPE


  constructor(
    private modalCtrl: ModalController,
  ) { }

 async ngOnInit() {
    console.log("---MyBookingModalComponent---")
    console.log("props: ", this.props)
    this.isCreate = this.props.role === 'create'
    this.isEdit = this.props.role === 'edit'
    this.isView = this.props.role === 'view'

    this.bookingService.myBooking.asObservable()
      .pipe(map((data: any) => {
          //this.booking = data
        return data
      }))
      .subscribe((sub) => {
        console.log("myBooking asObservable sub: ", sub)
        this.booking = sub
      })

    console.log("props role: ", this.isCreate, this.bookingService.booking, this.booking)
  }

  close = () => this.modalCtrl.dismiss()


}
