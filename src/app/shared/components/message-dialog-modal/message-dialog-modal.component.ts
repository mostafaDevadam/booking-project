import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-message-dialog-modal',
  templateUrl: './message-dialog-modal.component.html',
  styleUrls: ['./message-dialog-modal.component.scss'],
})
export class MessageDialogModalComponent  implements OnInit {

  constructor(public modalCtrl: ModalController,) { }

  ngOnInit() {
    console.log("---MessageDialogModalComponent---")
  }

  cancel(){
    this.modalCtrl.dismiss(null, 'cancel')
  }

  confirm(){
    this.modalCtrl.dismiss(true, 'confirm')
  }

}
