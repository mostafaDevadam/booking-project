import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Note, NoteDocument, eAUTHOR_ROLE_ENUM } from './note';
import { InjectModel } from '@nestjs/mongoose';
import { Guest } from '../../user/guest/guest';

@Injectable()
export class NoteService {

    constructor(
        @InjectModel(Note.name)
        private readonly noteModel: Model<Note>) { }

    // createByBookingId
    async createByBookingId(data: NoteDocument) {
        return await this.noteModel.create(data)
    }
    // findAllByBookingId
    async findAllByBookingId(booking_id: any) {
        return await this.noteModel.find({booking: booking_id})
    }
    // findAllByAuthorIdAsGuest if AuthorRole is 'Guest'
    async findAllByAuthorIdAsGuest(guest_id: any) {
        return await this.noteModel.find({author: guest_id, author_role: eAUTHOR_ROLE_ENUM.Guest})
    }
    // findAllByAuthorIdAsHotel if AuthorRole is 'Hotel'
    async findAllByAuthorIdAsHotel(hotel_id: any) {
        return await this.noteModel.find({author: hotel_id, author_role: eAUTHOR_ROLE_ENUM.Hotel})
    }

    //findOneById
    async findOneById(_id: any) {
        return await this.noteModel.findById(_id)
    }
    //updateById
    async updateById(_id: any, data: NoteDocument) {
        return await this.noteModel.findByIdAndUpdate(_id, data)
    }
    // removeById
    async removeById(_id: any) {
        return await this.noteModel.findByIdAndDelete(_id)
    }

}


