import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GuestService } from 'src/app/services/guest.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';

export const feedbackResolverFn: ResolveFn<boolean> = (route, state) => {
  const h = inject(HotelService).getHotelId()
  const g = inject(GuestService).getGuestId()
  const u = inject(UserService).getRole()

  if (u === 'hotel') {
    const obj = {}
    console.log("feedback resolver: 1",)
  } else if (u === 'guest') {
    console.log("feedback resolver: 2",)
  }


  return true;
};
