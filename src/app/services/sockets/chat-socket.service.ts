import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { CHAT_TYPE } from 'src/app/common/types';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {

  chats: CHAT_TYPE[]
  chat: CHAT_TYPE

  constructor(private socket: Socket) { }

  getChatById = async (chat_id: any) => {
    this.socket.emit('chat/set/id', {chat_id})
    const chat = await this.getData('getChatById')

    return chat.pipe(
      map(({data}: any) => {
        console.log("getChatById data: ", data)
        this.chat = data
        return data
      })
    )


  }


  getData = async (key: string) => {
    const result = this.socket.fromEvent(key)
    return result.pipe(map((data: any) => data))
  }
}
