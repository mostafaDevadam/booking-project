import { Injectable } from '@angular/core';
import { CHAT_TYPE } from 'src/app/common/types';
import { CallApiService } from '../callAPI/call-api.service';
import { BehaviorSubject, Subject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {




  chats: CHAT_TYPE[]
  chat: CHAT_TYPE
  chatsByHotel: BehaviorSubject<CHAT_TYPE[]> = new BehaviorSubject<CHAT_TYPE[]>([]);
  chatsByGuest: BehaviorSubject<CHAT_TYPE[]> = new BehaviorSubject<CHAT_TYPE[]>([]);


  constructor(
    private callApiService: CallApiService,
  ) { }



  fetchAllByHotelId = async (hotel_id: any) => {
    const result = await this.callApiService.get(`chat/all/hotel/${hotel_id}`)

    return result.pipe(map((data: any) => {
      console.log(" fetchAllChatsByHotelId pipe data:", data)
      this.chats = data
      this.chatsByHotel.next(data)
      return data
    }))
    /*  .subscribe((sub) => {
        this.chats = sub
        console.log(" fetchAllChatsByHotelId:", sub)
        return sub
      })*/

  }

  fetchAllByGuestId = async (guest_id: any) => {
    const result = await this.callApiService.get(`chat/all/guest/${guest_id}`)
    return result.pipe(map((data: any) => {
      this.chats = data
      this.chatsByGuest.next(data)
      return data
    }))
    /*.subscribe((sub) => {
      this.chats = sub
      console.log(" fetchAllChatsByGuestId:", sub)
    })*/
  }

  fetchOneById = async (_id: any) => {
    const result = await this.callApiService.get(`chat/${_id}`)
    result.pipe(map((data: any) => {
      this.chats = data
      return data
    }))
      .subscribe((sub) => {
        this.chat = sub
        console.log(" fetchChatById:", sub)
      })
  }

  patchUpateById = async (_id: any, data: CHAT_TYPE) => {
    const result = await this.callApiService.patch(`chat/${_id}`, data)
    result.pipe(map((data: any) => {
      return data
    }))
      .subscribe((sub) => {
        console.log(" patchUpdateChatById:", sub)
      })
  }

  test = () => {
    console.log("test chat service for resolver for chat route")
    return true
  }

  getChatsByHotel = () => this.chatsByHotel.value
}
