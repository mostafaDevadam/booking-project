import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent  implements OnInit {
  @Input() props: any
  isEdit: boolean = false
  isView: boolean = false
   data: any




  constructor(private modalCtrl: ModalController,public bookingService: BookingService,

    ) { }

  ngOnInit() {
    console.log("--- BookingModalComponent ----")
    this.isEdit = this.props.role == 'edit' ? true : false
    this.isView = this.props.role == 'view' ? true : false
    console.log("props: ", this.props, this.isEdit)
   this.data =  this.props.booking
   this.init()
  }

  close = () => { this.modalCtrl.dismiss()}

  init(){
   console.log("booking: ",this.bookingService.booking)

  }

}
