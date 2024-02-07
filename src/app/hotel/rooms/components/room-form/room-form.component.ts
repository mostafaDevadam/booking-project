import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { KIND_OF_ROOM_ENUM } from 'src/app/common/enums';
import { ROOM_TYPE } from 'src/app/common/types';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss'],
})
export class RoomFormComponent implements OnInit {
  @Input() data: any

  public room: ROOM_TYPE

  public editForm: any

  roomTypes_keys = Object.keys(KIND_OF_ROOM_ENUM)

  lbls: { [key in KIND_OF_ROOM_ENUM]: KIND_OF_ROOM_ENUM } = {
    single: KIND_OF_ROOM_ENUM.single,
    double: KIND_OF_ROOM_ENUM.double,
  }

  getRoomType = (t: KIND_OF_ROOM_ENUM) => this.lbls[t]


  constructor(private roomService: RoomService, public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log('----Room Form----')
    console.log("room: ", this.roomService.room, this.data)
    console.log(this.data)
    if (this.data ) {
      this.room = this.data
      this.editForm = new FormGroup({
        _id: new FormControl(this.roomService.room._id || this.room._id),
        room_type: new FormControl(this.roomService.room.room_type || this.room.room_type || KIND_OF_ROOM_ENUM.single),
        price: new FormControl(this.roomService.room.price || this.room.price),
        phone_number: new FormControl(this.roomService.room.phone_number || this.room.phone_number),
        cleaned_date: new FormControl(this.roomService.room.cleaned_date || this.room.cleaned_date),
        isCleaned: new FormControl(this.roomService.room.isCleaned || this.room.isCleaned),
        isBooked: new FormControl<boolean>({ value: Boolean(this.roomService.room.isBooked || this.room.isBooked), disabled: true }),
      })
    }
  }

  submit = () => {
    console.log("submit update room: ", this.editForm.value)
    this.roomService.setEditRoom(this.editForm.value)
    this.modalCtrl.dismiss(this.editForm.value, 'edit-room-form')
  }




}
