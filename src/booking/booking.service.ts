import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking';
import { Model } from 'mongoose';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>
    ) {}
}
