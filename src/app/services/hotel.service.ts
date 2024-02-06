import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HOTEL_TYPE } from '../common/types';


const apiURL = environment.API_URL + 'hotel/'

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotel: HOTEL_TYPE = {}
  private hotel_id: any
  private hotels: HOTEL_TYPE [] = []

  constructor(private http: HttpClient) { }

  fetchHotelById = async (_id: any) => {
    const result = await this.http.get(apiURL + _id)
    result.subscribe((sub: HOTEL_TYPE) => {
      console.log('fetchHotelById: ', sub)
      //this.hotel = sub
      //this.hotel_id = sub._id
      this.setHotelId(sub._id)
      this.setHotel(sub)
    })
  }

  setHotelId(_id: any) {
    this.hotel_id = _id
  }

  getHotelId(){
    return this.hotel_id
  }

  setHotel(hotel: HOTEL_TYPE){
    this.hotel = hotel
  }

  getHotel(): HOTEL_TYPE{
    return this.hotel
  }

  static getStaticHotelId() {

  }

}
