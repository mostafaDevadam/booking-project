import { inject } from '@angular/core';
import { Resolve, ResolveFn, ResolveData, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CHAT_TYPE } from 'src/app/common/types';
import { ChatService } from 'src/app/services/chat/chat.service';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

export const chatResolverFn: ResolveFn<any> = async (route, state) => {
  const h = inject(HotelService).getHotelId()
  const g = inject(GuestService).getGuestId()

  //console.log("hotel_id in chat resolver: ", h)
  //const service = inject(ChatService).fetchAllByHotelId(h)

  //const user = inject(UserService)
  // await user.CheckAndFetchUser()
  // const current_user = user.currentUser


  if (h) {
    const chat = await inject(ChatService).fetchAllByHotelId(h)
    console.log("chat resolver by hotel_id: ", chat)
  }

  if(g){
    //console.log("chat resolver guest: ", g)
    const chat = await inject(ChatService).fetchAllByGuestId(g)
    console.log("chat resolver by guest_id : ", chat)
  }



  /*
    if (user.role == 'hotel') {
      await chat.fetchAllByHotelId(current_user._id)
        .then(th => th.subscribe((sub) => {
          console.log(" chats by hotel resolver sub:", sub)
        }))

    } else if (user.role == 'guest') {
      await chat.fetchAllByGuestId(current_user._id)
        .then(th => th.subscribe((sub) => {
          console.log(" chats by guest resolver sub:", sub)
        }))

    }
  */


  return


};

