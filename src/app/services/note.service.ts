import { Injectable, computed, signal, effect } from '@angular/core';
import { CallApiService } from './callAPI/call-api.service';
import { NOTE_TYPE } from '../common/types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  list = signal<NOTE_TYPE[]>([])


  compute : any /*= computed(() => {
    const docs = this.list()
    if (docs) {
      return this.list()
    }
    return []
  })*/


  constructor(private callApiService: CallApiService) { }

  // createByBookingId
  async postCreateOneByBookingId(booking_id: any, data: NOTE_TYPE) {
    const result = await this.callApiService.post(`note/create/booking/${booking_id}`, data)
    result.subscribe((sub) => console.log("postCreateOneByBookingId: ", sub))
  }
  // findAllByBookingId
  async findAllByBookingId(booking_id: any) {
    const result = await this.callApiService.get(`note/all/booking/${booking_id}`)
    return result.pipe(map((data: any) => {
      this.list.set(data)
    /*  this.compute = computed(() => {
        if (data) return data
        return []
      })*/
      return data
    }))//.subscribe((sub) => console.log("findAllByBookingId: ", sub))
  }
  // findAllByAuthorIdAsGuest if AuthorRole is 'Guest'
  async findAllByAuthorIdAsGuest(guest_id: any) {
    return await this.callApiService.get(`note/all/guest/${guest_id}`)
  }
  // findAllByAuthorIdAsHotel if AuthorRole is 'Hotel'
  async findAllByAuthorIdAsHotel(hotel_id: any) {
    return await this.callApiService.get(`note/all/hotel/${hotel_id}`)
  }

  //findOneById
  async findOneById(_id: any) {
    return await this.callApiService.get(`note/${_id}`)
  }
  //updateById
  async updateById(_id: any, data: NOTE_TYPE) {
    const result = await this.callApiService.patch(`note/${_id}`, data)
    result.subscribe((sub) => console.log("updateById: ", sub))

  }
  // removeById
  async removeById(_id: any) {
    const result = await this.callApiService.remove(`note/${_id}`)
    result.subscribe((sub) => console.log("removeById: ", sub))
  }
}
