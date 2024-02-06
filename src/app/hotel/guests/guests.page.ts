import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.page.html',
  styleUrls: ['./guests.page.scss'],
})
export class GuestsPage implements OnInit {

  constructor(
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    console.log("---------")

  }

}
