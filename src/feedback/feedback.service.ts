import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FeedBackDocument, Feedback } from './feedback';
import { Model } from 'mongoose';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectModel(Feedback.name)
        private readonly feedBackModal: Model<Feedback>
    ) { }

    async create(data: FeedBackDocument) {
        return await this.feedBackModal.create(data)
    }


    // findAll for just testing
    async findAll() {
        return await this.feedBackModal.find()
    }

    async findAllByHotelId(hotel_id: any) {
        return await this.feedBackModal.find({hotel: hotel_id}).populate('guest')
    }

    async findAllByGuestId(guest_id: any) {
        return await this.feedBackModal.find({guest: guest_id}).populate('hotel')
    }

    async findOneById(_id: any) {
        return await this.feedBackModal.findById(_id)
    }

    async updateById(_id: any, data: FeedBackDocument) {
        return await this.feedBackModal.findByIdAndUpdate(_id, data, { new: true})
    }

    async removeById(_id: any) {
        return await this.feedBackModal.findByIdAndDelete(_id)
    }
}
