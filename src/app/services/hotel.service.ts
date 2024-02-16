import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HOTEL_TYPE } from '../common/types';
import { CallApiService } from './callAPI/call-api.service';
import { BehaviorSubject, map } from 'rxjs';


const apiURL = environment.API_URL + 'hotel/'

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotel: HOTEL_TYPE = {}
  private hotel_id: any
  private hotels: HOTEL_TYPE [] = []

  all_hotels: BehaviorSubject<HOTEL_TYPE[]> = new BehaviorSubject<HOTEL_TYPE[]>([]);


  constructor(private http: HttpClient, private callApiService: CallApiService) {

  }

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

  fetchAllHotels = async () => {
    const result = await this.callApiService.get(`hotel/all`)
    return result.pipe(map((data: any) => {
        //this.hotels = data
       // this.setHotels(data)
       console.log("fetchAllHotels: ", data)
       this.hotels = data
       this.all_hotels.next(data)
        return data
    }))
    //.subscribe((sub) => console.log("fetchAllHotels sub:", sub))


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

  setHotels(hotels: HOTEL_TYPE[]) {
    this.hotels = hotels
  }

  getHotels(): HOTEL_TYPE[] {
    return this.hotels
  }

  static getStaticHotelId() {

  }

}
