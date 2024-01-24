import { Body, Controller, Post, Get, Patch, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HOTEL_TYPE } from './hotel.types';
import { Hotel } from './hotel';

@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService){}

    @Get()
    async start() {
        return {"msg": "start hotel api"}
    }

    @Post()
    async createHotel(@Body() createHotelDto: HOTEL_TYPE): Promise<Hotel> {
        console.log("@hotel: ", createHotelDto)
        return await this.hotelService.createHotel(createHotelDto)

    }

    @Get('all')
    async getAllHotels(): Promise<Hotel[]> {
        return await this.hotelService.getAllHotels()
    }

    @Get('/:_id')
    async getHotel(@Param('_id') _id: any): Promise<Hotel> {
        return await this.hotelService.findHotelById(_id)
    }

    // getAllByCity
    // getAllByCountry
    // getByName

    // search by city, country, name
    

    @Patch('/:_id')
    async updateHotel(@Param('_id') _id: any, @Body() hotel: any): Promise<Hotel> {
        return await this.hotelService.updateHotelById(_id, hotel)
    }

}
