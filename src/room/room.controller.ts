import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomDocument } from './room';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('room')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async start() {
        return { "msg": "start room api" }
    }

    @Post('/create/hotel/:hotel_id')
    async create(@Param('hotel_id') hotel_id: any, @Body() data: RoomDocument) {
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
    @Get('all/available/hotel/:hotel_id')
    async getAllAvailableByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllAvailableRoomsByHotelId(hotel_id)
    }
    /*@Get('all/available')
    async getAllAvailable() {
        return await this.roomService.findAllAvailable()
    }*/

    @Get('all/booked/hotel/:hotel_id')
    async getAllBookedByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllBookedRoomsByHotelId(hotel_id)
    }


   /*@Get('all/booked')
    async getAllBooked() {
        return await this.roomService.findAllIsBooked()
    }*/

    @Get('all/cleaned/hotel/:hotel_id')
    async getAllCleanedByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllCleanedRoomsByHotelId(hotel_id)
    }

    /*@Get('all/cleaned')
    async getAllCleaned() {
        return await this.roomService.findAllCleaned()
    }*/

    @Get('all/notcleaned/hotel/:hotel_id')
    async getAllNotCleanedByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllNotCleanedRoomsByHotelId(hotel_id)
    }

    /*@Get('all/not/cleaned')
    async getAllNotCleaned() {
        return await this.roomService.findAllNotCleaned()
    }*/

    @Get('all/single/hotel/:hotel_id')
    async getAllSingleByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllSingleRoomsByHotelId(hotel_id)
    }

    /*@Get('all/single')
    async getAllSingle() {
        return await this.roomService.findAllSingle()
    }*/

    @Get('all/double/hotel/:hotel_id')
    async getAllDoubleByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.roomService.findAllDoubleRoomsByHotelId(hotel_id)
    }
    /*@Get('all/double')
    async getAllDouble() {
        return await this.roomService.findAllDouble()
    }*/

    @Get('/number')
    async getOneByRoomNumber(@Body() data: any) {
        return await this.roomService.findOneByRoomNumber(data.room_number)
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
