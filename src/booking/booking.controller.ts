import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService){}

    @Get()
    async start() {
        return {"msg": "start room api"}
    }
}
