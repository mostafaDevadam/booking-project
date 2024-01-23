import { Body, Controller, Post, Get, Patch, Param, Delete, } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking, BookingDocument } from './booking';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService){}

    @Get()
    async start() {
        return {"msg": "start room api"}
    }

    @Get('all')
    async getAll() {
        return await this.bookingService.findAll()
    }

    @Get('/:_id')
    async getOneById(@Param('_id') _id: any) {
        return await this.bookingService.findOneById(_id)
    }

    @Get('/all/hotel/:hotel_id')
    async getAllByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.bookingService.findAllByHotelId(hotel_id)
    }

    @Get('/all/room/:room_id')
    async getAllByRoomId(@Param('room_id') room_id: any) {
        return await this.bookingService.findAllByRoomId(room_id)
    }

    @Get('/all/guest/:guest_id')
    async getAllByGuestId(@Param('guest_id') guest_id: any) {
        return await this.bookingService.findAllByGuestId(guest_id)
    }

    @Patch('/:_id')
    async updateOne(@Param('_id') _id: any, @Body() data: any) {
        return await this.bookingService.updateOne(_id, data)
    }

    @Delete('/:_id')
    async removeOne(@Param('_id') _id: any) {
        return await this.bookingService.removeOne(_id)
    }
}
