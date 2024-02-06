import { Optional, SkipSelf } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';

export const roomResolver: ResolveFn<boolean> = (route, state) => {

  return true;
};


export class RoomResolver {
  //constructor(/*private roomService: RoomService*/) { }

  r?: RoomService
  h?: HotelService

  constructor(

    @Optional()
    @SkipSelf()
    roomService?: RoomService,
    @Optional()
    @SkipSelf()
    hotelService?: HotelService
  ){
    if(roomService){
       this.r = roomService//.fetchAllRoomsByHotelId(hotelService?.getHotelId())
      throw new Error('RoomService is already loaded')
    }
    if(hotelService){
      this.h = hotelService
      throw new Error('HotelService is already loaded')
    }

    console.info('Room Service created')
  }

  static st = () => {

  }

  resolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {


      this.r?.fetchAllRoomsByHotelId(this.h)
      .then( th => {
        console.log(th)
      })



    console.log("resolver room : ", route, state)
    return true
  }
}
