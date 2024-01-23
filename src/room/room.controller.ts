import { Body, Controller, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async start() {
        return { "msg": "start room api" }
    }

    @Post('/create/hotel/:hotel_id')
    async create(@Param('hotel_id') hotel_id: any, @Body() data: any) {
        return await this.roomService.create(hotel_id, data)
    }

    @Get('all')
    async getAll() {
        return await this.roomService.findAll()
    }

    @Get('/:_id')
    async getOneById(@Param('_id') _id: any) {
        return await this.roomService.findOneById(_id)
    }

    /*async getOneByGuestId() {
        return
    }*/

    @Get('/all/hotel/:hotel_id')
    async getAllByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllByHotelId(hotel_id)
    }

    /*@Get('/all/guest/:guest_id')
    async getAllByGuestId(@Param('guest_id') guest_id: any) {
        return await this.roomService.findAllByGuestId(guest_id)
    }*/

    async getAllAvailable() {
        return await this.roomService.findAllAvailable()
    }
    async getAllIsBooked() {
        return await this.roomService.findAllIsBooked()
    }
    async getAllCleaned() {
        return await this.roomService.findAllCleaned()
    }
    async getAllNotCleaned() {
        return await this.roomService.findAllNotCleaned()
    }

    @Patch('/:_id')
    async updateOne(@Param('_id') _id: any, @Body() data: any) {
        return await this.roomService.updateOne(_id, data)
    }

    @Delete('/:_id')
    async removeOne(@Param('_id') _id: any) {
        return await this.roomService.removeOne(_id)
    }


}
