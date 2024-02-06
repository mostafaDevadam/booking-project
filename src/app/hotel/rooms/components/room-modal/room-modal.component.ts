import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular/common';
import { OverlayEventDetail } from '@ionic/core';
import { ROOM_TYPE } from 'src/app/common/types';
import { MessageDialogModalComponent } from 'src/app/shared/components/message-dialog-modal/message-dialog-modal.component';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss'],
})
export class RoomModalComponent implements OnInit {
  //@ViewChild(IonModal) modal: IonModal
  @Input() data: any;

  room: ROOM_TYPE

  name: string
  message = "This Room Modal..."

  isEdit: boolean = false

  constructor(public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    console.log("-----RoomModal---- ")
    console.log(this.data)
    if (this.data.room) { this.room = this.data.room }

  }

  closeModal() {
    this.modalCtrl.dismiss()
  }

  cancel = () => {
    this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm = () => {
    this.modalCtrl.dismiss(true, 'confirm')
  }

  /*onWillDismiss = (event: Event) => {
    const e = event as CustomEvent<OverlayEventDetail<string>>;
    if(e.detail.role === 'confirm') {
      this.message = `Hallo, ${e.detail.data}`
    }
  }*/

  displayEditForm = () => { this.isEdit = !this.isEdit }

  openRemoveModal = () => {
    console.log("---open Message Dialog Modal for remove")
    //this.presentModal()
    this.presentActionSheet()
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: MessageDialogModalComponent,
      cssClass: ['message_dialog_modal'],

    })

    await modal.present()

    const { data, role } = await modal.onWillDismiss()

    if (role === 'confirm') {
      console.log('confirmed removed: ', data)
    }
  }

  presentActionSheet = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Do you want remove it?!',
      // subHeader: 'Do you want remove it?!',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => this.handlerCallback(true),
          data: {
            action: 'removed'
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => this.handlerCallback(false),
          data: {
            action: 'cancel',
          }
        }
      ]
    })

    await actionSheet.present()
  }

  handlerCallback = (val: boolean) => {
    if (val) {
      console.log("removed from ActionSheet: ", val)
      this.confirm()
    }
  }

}
