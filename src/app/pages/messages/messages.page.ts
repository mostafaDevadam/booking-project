import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, pipe } from 'rxjs';
import { SENDER_RECEIVER_ROLE } from 'src/app/common/enums';
import { MESSAGE_INPUT_TYPE, MESSAGE_TYPE } from 'src/app/common/types';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { MessageSocketService } from 'src/app/services/sockets/message-socket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  isSend: boolean = false

  messages: MESSAGE_TYPE[]

  constructor(private socket: Socket,
    private messageSocketService: MessageSocketService,
    private hotelService: HotelService,
    private guestService: GuestService,



  ) { }

  async ngOnInit() {
    console.log(".-------MessagesPage---")
    console.log("socket: ",)
    this.socket.connect();
   /* this.socket.fromEvent('message')
      .pipe(map((data) => data))
      .subscribe(sub => console.log("Message socket sub: ", sub))*/

   // this.socket.fromEvent('init').pipe(map((data) => data)).subscribe(sub => console.log("init socket sub: ", sub))

   let messages = this.messageSocketService.messages
   console.log('messages:', await this.messageSocketService.getList())


  }

 async ionViewWillEnter() {
    this.fetchMessages()
    console.log('messages:', await this.messageSocketService.getList())

  }

  ionViewWillUnload(){
    this.fetchMessages()
  }

  sendMessage = () => {
    const chat_id = "65c4de60b38f05ba74171ff8"
    this.isSend = true
    // this.socket.emit('msg', { text: "ionic...123" });
    const data: MESSAGE_INPUT_TYPE = {
      "sender_role": SENDER_RECEIVER_ROLE.Hotel,
      "receiver_role": SENDER_RECEIVER_ROLE.Guest,
      "hotel": "65aee22775e0be677b51126a",
      "guest": "65afb60143cc1a5951c89578",
      "message": "hallo",
      "sender": "65aee22775e0be677b51126a", // current_user
      "receiver": "65afb60143cc1a5951c89578",
      "chat_id": chat_id,
    }
    this.messageSocketService.createMessage('create_msg', data)
    this.fetchMessages()


  }

  fetchMessages = async () => {
    const chat_id = "65c4de60b38f05ba74171ff8"
    const all = await this.messageSocketService.getAllMessagesByChatId('set_chat_id', chat_id)
    all.subscribe( sub => {
      this.messages = sub
      console.log("messages: ", sub)
    })
    await this.messageSocketService.getData('chat')
    .then( th => th
    .subscribe((sub: any) => console.log("chat data socket sub: ", sub))
    )

  }

  ionViewWillLeave() {
    this.socket.disconnect()
  }

  selectMessage = (msg: MESSAGE_TYPE) => {
    console.log("msg: ", msg)

  }

}
