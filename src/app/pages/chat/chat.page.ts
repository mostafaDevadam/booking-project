import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CHAT_TYPE } from 'src/app/common/types';
import { ChatService } from 'src/app/services/chat/chat.service';
import { HotelService } from '../../services/hotel.service';
import { map } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ViewChatComponent } from './components/view-chat/view-chat.component';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import { GuestService } from 'src/app/services/guest.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats: CHAT_TYPE[]

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private authService: AuthService,
    private guestService: GuestService,
  ) { }

  async ngOnInit() {
    console.log("---ChatPage---")
  /*  if (this.userService.currentUser.role == 'hotel') {
      this.chatService.chatsByHotel
        .asObservable()
        .subscribe((sub) => {
          console.log("asObservable chats", sub)
          this.chats = sub
        })

    } else if (this.userService.currentUser.role == 'guest') {
      this.chatService.chatsByGuest
        .asObservable()
        .subscribe((sub) => {
          console.log("asObservable chats", sub)
          this.chats = sub
        })

    }*/

    console.log("user role: ", this.userService.currentUser)

    this.activatedRoute.data.subscribe((data) => {
      console.log("chat resolve in chat page: ", data)
    })

    console.log("auth role :", this.authService.getRole())

    if(this.authService.getRole() == 'guest'){
      console.log("auth role guest :", this.authService.getRole(), this.userService.currentUser)
      await this.chatService.fetchAllByGuestId(this.guestService.getGuestId())
      .then(th => th.subscribe((sub) => {
        this.chats = sub
        console.log("this chats:", this.chats)
      }))
    }

    if(this.authService.getRole() == 'hotel'){
      console.log("auth role hotel :", this.authService.getRole())
      await this.chatService.fetchAllByHotelId(this.hotelService.getHotelId())
      .then(th => th.subscribe((sub) => {
        this.chats = sub
        console.log("this chats:", this.chats)
      }))
    }




  }


  selectChat = (item: CHAT_TYPE) => {
    // console.log('selected chat: ', item)
    // open ModalCtrl
    this.presentModal({ chat: item })
  }

  presentModal = async (props: any) => {
    const modal = await this.modalCtrl.create({
      component: ViewChatComponent,
      componentProps: props,
    })

    return await modal.present()
  }

}
