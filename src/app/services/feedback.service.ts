import { Injectable } from '@angular/core';
import { CallApiService } from './callAPI/call-api.service';
import { FEEDBACK_TYPE } from '../common/types';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private list: FEEDBACK_TYPE[] = []

  constructor(private callAPiService: CallApiService) { }

  async postCreateOneByGuestIdAndHotelId(guest_id: any, hotel_id: any, data: FEEDBACK_TYPE) {
    const result = await this.callAPiService.post(`feedback/create/guest/${guest_id}/hotel/${hotel_id}`, data)
    result.subscribe((sub) => console.log("postCreateOneByGuestIdAndHotelId: ", sub))
  }

  async fetchAllByGuestId(guest_id: any) {
    const result = await this.callAPiService.get(`feedback/all/guest/${guest_id}`)

    return result.pipe(map((data: any) => data))
    // result.subscribe((sub) => console.log("fetchAllByGuestId: ", sub))


  }

  async fetchAllByHotelId(hotel_id: any) {
    const result = await this.callAPiService.get(`feedback/all/hotel/${hotel_id}`)
    return result.pipe(map((data: any) => data))
    //result.subscribe((sub) => console.log("fetchAllByHotelId: ", sub))

  }

  async fetchOneFeedBackById(_id: any) {
    const result = await this.callAPiService.get(`feedback/${_id}`)
     result.subscribe((sub) => console.log("fetchOneFeedBackById: ", sub))
  }

  async patchUpdateFeedBackById(_id: any, data: FEEDBACK_TYPE) {
    const result = await this.callAPiService.patch(`feedback/${_id}`, data)
     result.subscribe((sub) => console.log("patchUpdateFeedBackById: ", sub))
  }

  async removeOneFeedById(_id: any) {
    const result = await this.callAPiService.remove(`feedback/${_id}`)
    result.subscribe((sub) => console.log("removeOneFeedById: ", sub))

  }

  // local

  setInFeedBackList(data: FEEDBACK_TYPE): void {
    this.list.push(data)
  }

  get_FeedBackListForHotel(): FEEDBACK_TYPE[] {
    return this.list
  }

  get_FeedBackListForGuest(): FEEDBACK_TYPE[] {
    return this.list
  }






}
