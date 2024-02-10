import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { MESSAGE_INPUT_TYPE, MESSAGE_TYPE } from 'src/app/common/types';

@Injectable({
  providedIn: 'root'
})
export class MessageSocketService {

  messages: MESSAGE_TYPE[]
  message: MESSAGE_TYPE



  constructor(private socket: Socket,
  ) { }


  createMessage = (key: string, data: MESSAGE_INPUT_TYPE) => {
    this.socket.emit(key, data)
  }

  getAllMessagesByChatId = async (key: string, chat_id: any) => {
    this.socket.emit(key, { chat_id })
    const list = await this.getData('getAllMessagesByChatId')

   return list.pipe(
      map(({data}: any) => {
        console.log("messages data: ", data)
        this.messages = data
        return data
      })
    )



    /*.subscribe((sub) => {
      console.log("messages sub: ", sub)
      //this.messages = sub
      console.log("this messages : ", this.messages)
    })*/

  }

  getData = async (key: string) => {
    const result = this.socket.fromEvent(key)
    return result.pipe(map((data: any) => data))
    //.subscribe((sub: any) => console.log(key + " data socket sub: ", sub.data))
  }

  getList = () => this.messages


}
