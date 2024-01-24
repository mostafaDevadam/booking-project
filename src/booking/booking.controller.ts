import { Body, Controller, Post, Get, Patch, Param, Delete, } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking, BookingDocument } from './booking';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    @Get()
    async start() {
        return { "msg": "start booking api" }
    }

    @Post('/hotel/:hotel_id/room/:room_id/guest/:guest_id')
    async createBooking(
        @Param('hotel_id') hotel_id: any,
        @Param('room_id') room_id: any,
        @Param('guest_id') guest_id: any,
        @Body() data: BookingDocument) {
        return await this.bookingService.create(hotel_id, room_id, guest_id, data)
    }

    @Get('all')
    async getAllBookings() {
        return await this.bookingService.findAll()
    }

    @Get('/:_id')
    async getOneBookingById(@Param('_id') _id: any) {
        return await this.bookingService.findOneById(_id)
    }

    @Get('/all/hotel/:hotel_id')
    async getAllBookingsByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.bookingService.findAllByHotelId(hotel_id)
    }

    @Get('/all/room/:room_id')
    async getAllBookingsByRoomId(@Param('room_id') room_id: any) {
        return await this.bookingService.findAllByRoomId(room_id)
    }

    @Get('/all/guest/:guest_id')
    async getAllBookingsByGuestId(@Param('guest_id') guest_id: any) {
        return await this.bookingService.findAllByGuestId(guest_id)
    }

    @Patch('/:_id')
    async updateOneBooking(@Param('_id') _id: any, @Body() data: any) {
        return await this.bookingService.updateOne(_id, data)
    }

    // change room in booking
    @Patch('/:booking_id/change/room/:room_id')
    async changeRoomInBooking(@Param('booking_id') booking_id: any, @Param('room_id') room_id: any) {
         return await this.bookingService.changeRoomInBooking(booking_id, room_id)
    }

    @Delete('/:booking_id/room/:room_id')
    async removeOneBooking(@Param('booking_id') booking_id: any, @Param('room_id') room_id: any) {
        return await this.bookingService.removeOne(booking_id, room_id)
    }
}
