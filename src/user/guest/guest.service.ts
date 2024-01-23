import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Guest, GuestDocument } from './guest';
import { Model } from 'mongoose';
import { GUEST_INPUT_TYPE } from './guest.types';

@Injectable()
export class GuestService {
    constructor(
        @InjectModel(Guest.name)
        private readonly guestModel: Model<Guest>
    ){}

    async create(data: GUEST_INPUT_TYPE): Promise<Guest> {
        return await this.guestModel.create(data)
    }

    async getAll(): Promise<Guest[]> {
        return await this.guestModel.find().exec()
    }

    async findById(_id: any): Promise<Guest> {
         return await this.guestModel.findById(_id)
    }

    async findByEmail(email: string): Promise<GuestDocument> {
        return await this.guestModel.findOne({email: email})
    }

    async updateById(_id: any, data: any): Promise<Guest> {
        return await this.guestModel.findByIdAndUpdate(_id, data, {new: true})
    }









}
