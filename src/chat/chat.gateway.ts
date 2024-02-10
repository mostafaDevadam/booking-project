import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';

@WebSocketGateway(
 7070, {cors: '*:*'}
)
export class ChatGateway {

  @WebSocketServer() private server: any;

  constructor(
    private readonly chatService: ChatService,
  ){}

  // set_hotel_id
  // getAllChatsByHotelId

  // set_guest_id
  // getAllByGuestId

  // setChatId
  // getChatById
  //@SubscribeMessage('setChatId')
  @SubscribeMessage('chat/set/id')
  async getChatById(@MessageBody() data: {_id: any}) {
    if(data && data._id){
      const chat = await this.chatService.getChatById(data._id)
      this.server.emit('getChatById', {data: chat})
    }
    return {event: 'event', data}
  }



  // set_update_chat
  // updateChatById





  @SubscribeMessage('chat')
  handleMessage(client: any, payload: any): string {
    return 'Hello world chat!';
  }
}
