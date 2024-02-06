import { Injectable, OnInit } from '@angular/core';
import { HotelService } from './hotel.service';
import { ROOM_TYPE } from '../common/types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CallApiService } from './callAPI/call-api.service';
import { keys } from '../common/keys';
import { map } from 'rxjs';

const apiURL = environment.API_URL + 'room/'


@Injectable({
  providedIn: 'root'
})
export class RoomService {

  //hotel_id: any

  rooms: ROOM_TYPE[] = []
  roomsByHotel: ROOM_TYPE[] = []
  bookedRoomsByHotel: ROOM_TYPE[] = []
  availableRoomsByHotel: ROOM_TYPE[] = []
  cleanedRoomsByHotel: ROOM_TYPE[] = []
  notCleanedRoomsByHotel: ROOM_TYPE[] = []
  singleRoomsByHotel: ROOM_TYPE[] = []
  doubleRoomsByHotel: ROOM_TYPE[] = []

  editRoom: ROOM_TYPE

  msgRemoved: string
  isRemoved: boolean = false

  room: ROOM_TYPE
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient,
    private hotelService: HotelService,
    private callAPiService: CallApiService) { }

  /*
    buildHeaders = (headers: Headers): any => {
      const token = localStorage.getItem(keys.ION_TOKEN)//?.toString()
      if (token) {
        headers.append('auth-token', token)
        return headers
      }


    }*/


  async fetchAllRoomsByHotelId(hotel_id: any) {
    const result = await this.callAPiService.get('room/all/hotel/' + hotel_id);

    result.pipe(
      map((list: any): ROOM_TYPE[] => {
        console.log('list: ', list)
        //const data: ROOM_TYPE[] = list
        this.roomsByHotel = list
        return Array<ROOM_TYPE>(list)
      })
    ).subscribe((sub) => {
      console.log('fetchAllRoomsByHotelId: ', sub);

    })
    return true
  }

  postCreateRoomByHotelId = async (hotel_id: any, data: ROOM_TYPE) => {
    const result = await this.callAPiService.post('room/create/hotel/' + hotel_id, data)

    result.pipe(map((room: any) => {
      return room
    })).subscribe(sub => console.log("created new room: ", sub))
  }


  fetchAllAvailableRoomsByHotelId = async (hotel_id: any) => {
    const result = await this.callAPiService.get(`room/all/available/hotel/${hotel_id}`)

    result.pipe(map((list: any) => {
      this.availableRoomsByHotel = list
      return Array<ROOM_TYPE>(list)
    })).subscribe(sub => console.log("fetchAllAvailableRoomsByHotelId: ", sub))
  }

  fetchOneRoomById = async (_id: any) => {
    const result = await this.callAPiService.get(`room/${_id}`)

    result.pipe(map((data: any) => {
      this.room = data
      return <ROOM_TYPE>(data)
    })).subscribe((sub: ROOM_TYPE) => {
      console.log(" fetchOneRoomById: ", sub)
      this.room = sub
    })
  }

  patchUpdateRoomById = async (_id: any, data: ROOM_TYPE) => {
    const result = await this.callAPiService.patch(`room/${_id}`, data)
    result.pipe(map((data: any) => data))
      .subscribe((sub) => console.log("patchUpdateRoomById : ", sub))
  }

  deleteRoomById = async (_id: any) => {
    const result = await this.callAPiService.remove(`room/${_id}`)
    return result.pipe(map((data: any) => {
      if (data.error) {
        this.msgRemoved = data.error
        this.isRemoved = false
        return data
      }
      this.isRemoved = true
      return data
    }))
    /*  .subscribe((sub) => {
        console.log("deleteRoomById:", sub, typeof sub)
        this.msgRemoved = sub.error
      })*/
  }

  // local
  setEditRoom(room: ROOM_TYPE) {
    this.editRoom = room
  }

}
