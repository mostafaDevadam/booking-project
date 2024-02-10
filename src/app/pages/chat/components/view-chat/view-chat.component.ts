import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ROLE_ENUM, SENDER_RECEIVER_ROLE } from 'src/app/common/enums';
import { CHAT_TYPE, MESSAGE_INPUT_TYPE, MESSAGE_TYPE } from 'src/app/common/types';
import { MessageSocketService } from 'src/app/services/sockets/message-socket.service';
import { HotelService } from '../../../../services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/auth/auth.service';
import * as moment from 'moment'


@Component({
  selector: 'app-view-chat',
  templateUrl: './view-chat.component.html',
  styleUrls: ['./view-chat.component.scss'],
})
export class ViewChatComponent implements OnInit {
  @Input() chat: CHAT_TYPE;
  messages: MESSAGE_TYPE[]

  public message_input: string


  constructor(
    private modalCtrl: ModalController,
    private messageSocketService: MessageSocketService,
    private hotelService: HotelService,
    public userService: UserService,
    private authService: AuthService,

  ) { }

  ngOnInit() {
    console.log("---ViewChatComponent----")
    console.log("props:", this.chat)
    if (this.chat) {
      this.fetchMessages()

    }
  }

  closeModal = () => this.modalCtrl.dismiss()

  fetchMessages = async () => {
    const chat_id = this.chat._id
    const all = await this.messageSocketService.getAllMessagesByChatId('set_chat_id', chat_id)
    all.subscribe(sub => {
      this.messages = sub
      console.log("messages: ", sub)
    })
    await this.messageSocketService.getData('chat')
      .then(th => th
        .subscribe((sub: any) => {
          console.log("chat data socket sub: ", sub)

        })
      )

  }


  sendMessage = async () => {
    if (this.message_input) {
      console.log("send message: ", this.message_input)

      // if currentUser.role is hotel then {...}
      // else if currentUser.role is guest then {...}

      if (this.chat) { }

      if (this.userService.currentUser.role == ROLE_ENUM.hotel) {

        // sender is hotel

        // if (this.chat) { /* create message with chat_id */ } else { /* create chat and message */ }

        if (this.chat) {
          console.log("current user hotel role: ", this.userService.currentUser.role)
          const data: MESSAGE_INPUT_TYPE = {
            "sender_role": SENDER_RECEIVER_ROLE.Hotel,
            "receiver_role": SENDER_RECEIVER_ROLE.Guest,
            // "hotel": this.hotelService.getHotelId(),
            // "guest": this.chat.guest,
            "message": this.message_input,
            "sender": this.userService.currentUser._id, // this.hotelService.getHotelId(), //"65aee22775e0be677b51126a", // current_user
            "receiver": this.chat.guest, // "65afb60143cc1a5951c89578",
            "chat_id": this.chat._id,
          }

          console.log("data message: ", data,)
          console.log("current user:", this.userService.currentUser)
          this.messageSocketService.createMessage('create_msg', data)

          await this.fetchMessages()
        } else {
          console.log(" hotel should create a new chat and message")
        }


      } else if (this.userService.currentUser.role == ROLE_ENUM.guest) {
        // sender is guest
        console.log("current user guest role: ", this.userService.currentUser.role)
        //if (this.chat) { /* create message with chat_id */ } else { /* create chat and message */ }
        //this.messageSocketService.createMessage('create_msg', data)

        if (this.chat) {
          const data: MESSAGE_INPUT_TYPE = {
            "sender_role": SENDER_RECEIVER_ROLE.Guest,
            "receiver_role": SENDER_RECEIVER_ROLE.Hotel,
            "message": this.message_input,
            "sender": this.userService.currentUser._id,
            "receiver": this.chat.hotel,
            "chat_id": this.chat._id,
          }

          console.log("guest send message!! ", data)
          this.messageSocketService.createMessage('create_msg', data)
        } else {
          console.log(" guest should create a new chat and message")
        }

      }

      this.fetchMessages()
    }

  }

  doFormateDateTime = (date_input: any) => {
    const f1 = "YYYY-MM-DD HH:mm"
    const d = moment(date_input).format(f1)
    // console.log("formate date-time : ", date_input , d)
    return d
  }

}
