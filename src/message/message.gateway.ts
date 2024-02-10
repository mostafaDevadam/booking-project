import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { IoAdapter, } from '@nestjs/platform-socket.io';
import { ChatService } from 'src/chat/chat.service';
import { MessageService } from './message.service';
import { Message, MessageDocument, ROLE } from './message';
import { map, pipe } from 'rxjs';
import { Bind, UsePipes, ValidationPipe } from '@nestjs/common';
import { Chat, ChatDocument } from '../chat/chat';
import { Schema, Types } from 'mongoose';


type M_INPUT_TYPE = {
  chat_id?: any
  sender_role?: ROLE
  receiver_role?: ROLE
  hotel?: string
  guest?: string
  message: string
  sender: string
  receiver: any
  tag?: string
}


@WebSocketGateway(
  //{ transports: ['websocket']}
  7070,
  { cors: '*:*' }
)
export class MessageGateway { //implements NestGateway {

  @WebSocketServer() private server: any;

  constructor(
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,

  ) { }

  // afterInit(server_: any) { console.log("Init Server: ", server_) }

  // handleConnection?: (...args: any[]) => void;

  //handleDisconnect?: (client: any) => void;

  // @UsePipes(new ValidationPipe())
  //@Bind(['@MessageBody() ','@ConnectedSocket()'])
  //@Bind()
  @SubscribeMessage('create_msg')
  async createMsg(@MessageBody() data: M_INPUT_TYPE) {
    // {message, sender, receiver,}

    const m: M_INPUT_TYPE = data

    console.log("create msg: ", m)

    /* check if chat_id existing
    then create message
    else create a new chat and pass its _id to create new_message
    */

    if (m.sender_role == m.receiver_role) return { event: 'event', data: 'cannot send to yourself' }


    if (m) {
      const ch = { hotel: '', guest: '' }

      //ch.hotel = m.hotel
      // ch.guest = m.guest

      // if( sender_role == receiver_role) then return 'cannot send to yourself'


      // if m.ch_id then check chat by ch_id and create message with ch_id
      // else create new chat and pass its _id to new message

      if (m.chat_id) {
        //  check chat by ch_id and create message with ch_id
        const chat = await this.chatService.getChatById(m.chat_id)
        const check_chat = await this.chatService.checkIfChatIsExitingById(m.chat_id)
        if (chat) {
          console.log("chat_id existing: ", m.chat_id, chat, check_chat)

          const doc = {
            message: m.message,
            sender: m.sender,
            receiver: m.receiver,
            //man: m.sender,
            chat: m.chat_id,
            sender_role: m.sender_role,
            receiver_role: m.receiver_role,
          }
          const msg = await this.messageService.createMessage(doc)
          return { event: 'event', data: msg }
        }



      } else {
        // create new chat and pass its _id to new message

        if (m.hotel && m.guest) {


          const c = {
            tag: "my-chat",
            hotel: m.hotel,
            guest: m.guest
          }

          console.log("create chat c: ", c)
          const chat = await this.chatService.createChat(c)
          console.log("chat _id:", chat, chat.hotel)


          const doc = {
            message: m.message,
            sender: m.sender,
            receiver: m.receiver,
            //man: m.sender,
            chat: chat._id,
            sender_role: m.sender_role,
            receiver_role: m.receiver_role,
          }
          const new_msg = await this.messageService.createMessage(doc)


          return { event: 'event', data: new_msg }
        }


      }

    }






  }



  /*
  getAllMessagesByChatId
 getMessageById
 updateMessageById

  */

  @SubscribeMessage('set_chat_id')
  async setChatId(@MessageBody() data: { chat_id }) {
    if (data.chat_id) {
      console.log("chat_id: ", data)
      const messages = await this.messageService.getAllMessagesByChatId(data.chat_id)
      this.server.emit("getAllMessagesByChatId", { data: messages })
    }

    return { event: 'event', data }
  }

  // set_update_message
  @SubscribeMessage('set_update_message')
  async setUpdateMessage(@MessageBody() data: { _id: any, message: any }) {
    if (data && data._id) {
      const updated_message = await this.messageService.updateMessageById(data._id, data)
      this.server.emit("updatedMessageById", { data: updated_message })
    }
    return { event: 'event', data }
  }

  // getMessageById
  // set_message_id -> socket.emit("getMessageById", {data: message_doc})
  @SubscribeMessage('set_message_id')
  async setMessage(@MessageBody() data: { _id: any }) {
    if (data && data._id) {
      const message_doc = await this.messageService.getMessageById(data._id)
      this.server.emit("getMessageById", { data: message_doc })
    }

    return { event: 'event', data }
  }

  @SubscribeMessage('set_remove_message_id')
  async setRemovingMessage(@MessageBody() data: { _id: any }) {
    if (data && data._id) {
      const removed_message = await this.messageService.removeMessageById(data._id)
      this.server.emit("getRemovedMessageById", { data: removed_message })
    }

    return { event: 'event', data }
  }


  @SubscribeMessage('message')
  handleMessage(client: any, @ConnectedSocket() socket: any,): WsResponse<string> {
    console.log("call message socket")
    const event = 'event'
    this.server.emit("test", { data: "test ws" })
    return { event, data: "hello from nest socket" };
  }

  @SubscribeMessage('msg')
  handleMsg(
    @MessageBody() data: string,
    @ConnectedSocket() client: any,
  ): string {
    console.log(data)
    this.server.emit("test2", { data, msg: "test2 ws2" })

    return "asd"
  }
}
