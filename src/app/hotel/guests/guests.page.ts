import { Component, OnInit } from '@angular/core';
import { GUEST_TYPE } from 'src/app/common/types';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-guests',
  templateUrl: './guests.page.html',
  styleUrls: ['./guests.page.scss'],
})
export class GuestsPage implements OnInit {

  public guests: GUEST_TYPE[]

  constructor(
    private hotelService: HotelService,
    private guestService: GuestService,

  ) { }

  async ngOnInit() {
    console.log("----- GuestsPage ----")
    if (this.hotelService.getHotelId()) {
      await this.guestService.fetchAllGuestsByHotelId(this.hotelService.getHotelId())
      .then( th => {
        th.subscribe((sub: GUEST_TYPE[]) => {
           console.log("fetch guests: ", sub)
           this.guests = sub
        })

      })
     // this.guests = this.guestService.guests
    }


  }

  async ionViewWillEnter() {
    console.log("----ionViewWillEnter-----")
    console.log("guests: ", this.guests)

  }

  ionViewCanEnter() {
    console.log("----ionViewCanEnter-----")

  }

}
