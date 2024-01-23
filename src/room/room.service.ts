import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './room';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<Room>
    ) { }


    async create(hotel_id: any, data: any) {
        data.hotel = hotel_id
        return await this.roomModel.create(data)
    }

    async findAll() {
        return this.roomModel.find().exec()
    }
    async findOneById(_id) {
        return this.roomModel.findById(_id)
    }

    /*async findOneByGuestId() {
        return
    }*/

    async findAllByHotelId(hotel_id) {
        return this.roomModel.find({hotel: hotel_id}).exec()
    }
    /*
    async findAllByGuestId(guest_id) {
        return
    }*/

    async findAllAvailable() {
        return this.roomModel.find({isBooked: false}).exec()
    }
    async findAllIsBooked() {
        return this.roomModel.find({isBooked: true}).exec()
    }
    async findAllCleaned() {
        return this.roomModel.find({isCleaned: true}).exec()
    }
    async findAllNotCleaned() {
        return this.roomModel.find({isBooked: false}).exec()
    }

    async updateOne(_id: any, data: any) {
        return this.roomModel.findByIdAndUpdate(_id, data, { new: true, })
    }
    async removeOne(_id: any) {
        return this.roomModel.findByIdAndDelete(_id)
    }

}
