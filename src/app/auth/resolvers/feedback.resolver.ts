import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

export const feedbackResolverFn: ResolveFn<any | boolean> = (route, state) => {
  const h = inject(HotelService).getHotelId()
  const g = inject(GuestService).getGuestId()
  const u = inject(UserService).getRole()
  const f = inject(FeedbackService)

  if (u === 'hotel') {
    const obj = {}
    console.log("feedback resolver: 1",)
    if (h) f.fetchAllByHotelId(h)
    return { user: { role: 'hotel', _id: h }, feedbacks: [] }
  } else if (u === 'guest') {
    console.log("feedback resolver: 2",)
    if (g) f.fetchAllByGuestId(g)
    return { user: { role: 'guest', _id: g }, feedbacks: [] }
  }


  return true;
};
