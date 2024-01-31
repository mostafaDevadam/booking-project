import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './hotel';
import { HOTEL_TYPE } from './hotel.types';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class HotelService {
    constructor(
        @InjectModel(Hotel.name)
        private readonly hotelModel: Model<Hotel>,
        private readonly roomService: RoomService,
    ) { }

    //!Advanced
    async createHotel(data: HotelDocument): Promise<Hotel> {

        const hotel = await this.hotelModel.create(data)

        // generate_rooms is true <- (default)
        // get hotel._id and generate 10 rooms with hotel._id
        // oder
        // count_rooms , generate rooms based on count_rooms with hotel._id

        return hotel
    }

    async getAllHotels(): Promise<Hotel[]> {
        return await this.hotelModel.find().exec()
    }

    async findHotelById(_id: any): Promise<Hotel> {
        return await this.hotelModel.findById(_id).exec()
    }

    async findHotelByEmail(email: string): Promise<HotelDocument> {
        return await this.hotelModel.findOne({ email: email })
    }

    // findHotelByName
    async findHotelByName(name: string): Promise<HotelDocument> {
        return await this.hotelModel.findOne({ name: name })
    }

    // findAllHotelsByCity
    async findAllHotelsByCity(city: string): Promise<HotelDocument[]> {
        return await this.hotelModel.findOne({ city: city })
    }
    // findAllHotelsByCountry
    async findAllHotelsByCountry(country: string): Promise<HotelDocument[]> {
        return await this.hotelModel.findOne({ country: country })
    }
    // findByStreet
    async findByStreet(street: string): Promise<HotelDocument[]> {
        return await this.hotelModel.findOne({ street: street })
    }

    // search by city, country, name, street
    async search(fulltext: string) {
        return
    }

    async updateHotelById(_id: any, data: any): Promise<Hotel> {
        return await this.hotelModel.findByIdAndUpdate(_id, data, { new: true })
    }

    // remove
}
