import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { KIND_OF_ROOM_ENUM } from 'src/app/common/enums';
import { BOOKING_TYPE, ROOM_TYPE } from 'src/app/common/types';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.page.html',
  styleUrls: ['./new-room.page.scss'],
})
export class NewRoomPage implements OnInit {



 public roomForm = new FormGroup({
    room_type: new FormControl(KIND_OF_ROOM_ENUM.single),
    price: new FormControl(''),
    phone_number: new FormControl('')

  })


  roomTypes_keys = Object.keys(KIND_OF_ROOM_ENUM)

  lbls: { [key in KIND_OF_ROOM_ENUM]: KIND_OF_ROOM_ENUM } = {
    single: KIND_OF_ROOM_ENUM.single,
    double: KIND_OF_ROOM_ENUM.double
  }

  getRoomType = (t: KIND_OF_ROOM_ENUM) => this.lbls[t]


  constructor(
    private hotelService: HotelService,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    console.log("---------")
    this.initialize()

    if(true){
      var x = 2
    }


  }

  initialize() {
    if(this.hotelService.getHotelId()){

    }

  }

  submit(){
     console.log("save new room: ", this.roomForm.value);

    let new_one = {
      room_type : this.roomForm.value.room_type || KIND_OF_ROOM_ENUM.single,
      price: this.roomForm.value.price,
      phone_number: this.roomForm.value.phone_number
    }

     let inputsData: Partial<ROOM_TYPE> = new_one
     this.roomService.postCreateRoomByHotelId(this.hotelService.getHotelId(), new_one);

  }

}
