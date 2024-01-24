import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking';
import { Model } from 'mongoose';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>
    ) { }

    async create(hotel_id: any, room_id: any, guest_id: any, data: any) {
        data.hotel = hotel_id
        data.room = room_id
        data.guest = guest_id
        return await this.bookingModel.create(data)
    }

    async findAll() {
        return this.bookingModel.find().exec()
    }
    async findOneById(_id) {
        return this.bookingModel.findById(_id)
    }

    async findAllByHotelId(hotel_id) {
        return this.bookingModel.find({ hotel: hotel_id }).exec()
    }


    async findAllByRoomId(room_id) {
        return this.bookingModel.find({ room: room_id }).exec()
    }

    async findAllByGuestId(guest_id) {
        return this.bookingModel.find({ guest: guest_id }).exec()
    }


    async updateOne(_id: any, data: any) {
        return this.bookingModel.findByIdAndUpdate(_id, data, { new: true, })
    }
    async removeOne(_id: any) {
        return this.bookingModel.findByIdAndDelete(_id)
    }












}
