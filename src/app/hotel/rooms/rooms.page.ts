import { Component, OnInit, ViewChild, DoCheck, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { ROOM_TYPE } from '../../common/types';
import { AlertController, IonModal, ModalController, ToastController } from '@ionic/angular';
import { RoomModalComponent } from './components/room-modal/room-modal.component';
import { OverlayEventDetail } from '@ionic/core';
import { ROOM_FILTER } from 'src/app/common/enums';

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

  selectedRoom: ROOM_TYPE

  rooms: ROOM_TYPE[]

  roomFilter_keys = Object.keys(ROOM_FILTER)

  lbls: { [key in ROOM_FILTER]: ROOM_FILTER } = {
    all: ROOM_FILTER.all,
    available: ROOM_FILTER.available,
    booked: ROOM_FILTER.booked,
    cleaned: ROOM_FILTER.cleaned,
    notcleaned: ROOM_FILTER.notcleaned,
    single: ROOM_FILTER.single,
    double: ROOM_FILTER.double,
  }

  getRoomFilter = (t: ROOM_FILTER) => this.lbls[t]

  selectedRoomFilter: any


  constructor(
    private hotelService: HotelService,
    public roomService: RoomService,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,

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

  ionViewWillEnter() {
    console.log('----ionViewWillEnter-----')
    this.initialize()

  }

  initialize() {
    if (this.hotelService.getHotelId()) {
      this.hotel_id = this.hotelService.getHotelId()
      this.roomService.fetchAllRoomsByHotelId(this.hotel_id)
      this.rooms = this.roomService.roomsByHotel
    }
  }



  /*selectedRoom = (room: ROOM_TYPE) => {
    console.log('selected Room: ', room)
    this.roomService.fetchOneRoomById(room._id)
    this.showModal({ room, fetchRoom: this.roomService.room })

  }*/

  detectRoomFilter = async (event: any) => {
    console.log('detectRoomFilter: ', this.selectedRoomFilter, event.detail.value)
    if(this.selectedRoomFilter == ROOM_FILTER.all) {
      this.roomService.fetchAllRoomsByHotelId(this.hotel_id)
      this.rooms = this.roomService.roomsByHotel
      return
    }

    await this.roomService.fetchFilterRooms(event.detail.value, this.hotelService.getHotelId())
      .then((th) => {
        if(th){
          th.subscribe(sub => {
          this.rooms = sub
          console.log("filtered rooms: ", sub)
        })
        }
      })
    // this.rooms = this.roomService.filterRooms


  }

  viewRoom = (item: ROOM_TYPE) => {
    this.roomService.fetchOneRoomById(item._id)
    this.presentModal({ role: 'view', room: item })


  }
  editRoom = (item: ROOM_TYPE) => {
    this.roomService.fetchOneRoomById(item._id)
    this.presentModal({ role: 'edit', room: item })

  }

  removeRoom = (item: ROOM_TYPE) => {
    this.roomService.fetchOneRoomById(item._id)
    this.selectedRoom = item
    this.presentAlert()

  }
  /*
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
  /*

        }
      }
  */
  /*
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
  */
  handleRemove = async (val: boolean) => {
    if (val) {
      await this.roomService.deleteRoomById(this.selectedRoom._id)
        .then(th => th.subscribe((sub) => {
          if (sub) {
            console.log("sub removed room:", sub.error)
            if (sub.error) {
              this.presentToast(sub.error)
              return
            } else if (sub._id) {
              this.presentToast("removed the room")
              return
            }

          }
        }))
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

  presentAlert = async () => {
    const alert = await this.alertCtrl.create({
      header: 'Do you want remove it?',
      message: '',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => this.handleRemove(false)
      },
      {
        text: 'Confirm',
        role: 'confirm',
        handler: () => this.handleRemove(true)
      }
      ],


    })

    await alert.present()

  }

  presentModal = async (props: any) => {
    const modal = await this.modalCtrl.create({
      component: RoomModalComponent,
      componentProps: { props: props },

    })

    //const {data, role} = await modal.onWillDismiss()
    this.getDataFromModal(modal)




    return await modal.present()

  }


  getDataFromModal = async (modal: any) => {
    const { data, role } = await modal.onWillDismiss()

    console.log("modal data:", data, role)

    if (data) {
      await this.roomService.patchUpdateRoomById(data._id, data)
    }

  }

}
