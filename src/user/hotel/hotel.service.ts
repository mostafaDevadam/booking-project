import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './hotel';
import { HOTEL_TYPE } from './hotel.types';

@Injectable()
export class HotelService {
    constructor(
        @InjectModel(Hotel.name)
        private readonly hotelModel: Model<Hotel>
    ) {}

    async createHotel(data: HOTEL_TYPE): Promise<Hotel>{
        return await this.hotelModel.create(data)
    }

    async getAllHotels(): Promise<Hotel[]> {
        return await this.hotelModel.find().exec()
    }

    async findHotelById(_id: any): Promise<Hotel> {
        return await this.hotelModel.findById(_id).exec()
    }

    async findHotelByEmail(email: string): Promise<HotelDocument> {
        return await this.hotelModel.findOne({email: email})
    }

    async updateHotelById(_id: any, data: any): Promise<Hotel> {
        return await this.hotelModel.findByIdAndUpdate(_id, data, {new: true})
    }
}
