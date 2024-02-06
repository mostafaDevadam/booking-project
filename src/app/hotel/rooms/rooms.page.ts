import { Component, OnInit, ViewChild, DoCheck, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { ROOM_TYPE } from '../../common/types';
import { AlertController, IonModal, ModalController, ToastController } from '@ionic/angular';
import { RoomModalComponent } from './components/room-modal/room-modal.component';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],

})
export class RoomsPage implements OnInit {

  hotel_id: any

  @ViewChild(IonModal) modal: IonModal;

  name: string
  message = "This Room Modal..."

  constructor(
    private hotelService: HotelService,
    public roomService: RoomService,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,

  ) { }


  ngOnInit() {
    console.log("-----Rooms---- ", this.hotelService.getHotel(), this.hotelService.getHotelId())
    this.initialize()

  }

  /*ngAfterContentChecked() {
   if(this.roomService.msgRemoved){
     console.log("ngAfterViewChecked: ",)
     //await this.presentToast( "ssss!!!")
   }
 }*/


  //ngDoCheck() {}



  initialize() {
    if (this.hotelService.getHotelId()) {
      this.hotel_id = this.hotelService.getHotelId()
      this.roomService.fetchAllRoomsByHotelId(this.hotel_id)

    }
  }

  ionViewWillEnter() {
    console.log('----ionViewWillEnter-----')
    this.initialize()

  }

  selectedRoom = (room: ROOM_TYPE) => {
    console.log('selected Room: ', room)
    this.roomService.fetchOneRoomById(room._id)
    this.showModal({ room, fetchRoom: this.roomService.room })

  }

  async showModal(data_: any) {
    const modal = await this.modalCtrl.create({
      component: RoomModalComponent,
      componentProps: { data: data_ }
    })
    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      // this.message = `Hallo ${data}`
      // remove room
      //this.roomService.patchUpdateRoomById(data.room._id, data.room)
      //await this.roomService.deleteRoomById(data_.room._id)
      if (data) {
        console.log("remove confirm: ", data)
        await this.roomService.deleteRoomById(data_.room._id)
          .then(th => th.subscribe((sub) => {
            if (sub) {
              console.log("sub removed:", sub.error)
              this.presentToast(sub.error)
            }

          }))
        /*if(!data_.room.isBooked){
         await this.roomService.deleteRoomById(data_.room._id)
        }else{
         alert("can't remove the room because is already booked")
        }*/
        //this.presentToast(this.roomService.msgRemoved || "ssss!!!")


      }
    }

    const editRoom = this.roomService.editRoom
    if (editRoom) {
      console.log("edit room from rooms page: ", editRoom)
      await this.roomService.patchUpdateRoomById(editRoom._id, editRoom)
    }

  }
  // IonModal
  cancel = () => {
    this.modal.dismiss(null, 'cancel')
  }

  confirm = () => {
    this.modal.dismiss(this.name, 'confirm')
  }

  onWillDismiss = (event: Event) => {
    const e = event as CustomEvent<OverlayEventDetail<string>>;
    if (e.detail.role === 'confirm') {
      this.message = `Hallo, ${e.detail.data}`
    }
  }

  presentToast = async (msg: string) => {
    const toast = await this.toastCtrl.create({
      message: msg || 'msg-header',
      duration: 3000,
      position: 'top',

    })

    await toast.present()

  }

}
