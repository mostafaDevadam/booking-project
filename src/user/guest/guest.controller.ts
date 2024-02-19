import { Body, Controller, Post, Get, Patch, Param, UseGuards  } from '@nestjs/common';
import { GuestService } from './guest.service';
import { Guest, GuestDocument } from './guest';
import { GUEST_INPUTS_TYPE, GUEST_INPUT_TYPE } from './guest.types';
import { AuthGuard } from 'src/auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('guest')
export class GuestController {
    constructor(private readonly guestService: GuestService){}

    @Get()
    async start() {
        return {"msg": "start guest api"}
    }


    @Post()
    async createGuest(@Body() createGuestDto: GUEST_INPUT_TYPE): Promise<Guest> {
        console.log("@guest: ", createGuestDto)
        return await this.guestService.create(createGuestDto)
    }

    @Post('create/hotel/:hotel_id')
    async createGuestByAdmin(@Param('hotel_id') hotel_id: any, @Body() createGuestDto: GUEST_INPUTS_TYPE): Promise<Guest> {
        console.log("@guest: ", createGuestDto)
        return await this.guestService.createByHotelId(hotel_id, createGuestDto)
    }

    @Get('all')
    async getAll(): Promise<Guest[]> {
        return await this.guestService.getAll()
    }

    @Get('all/hotel/:hotel_id')
    async getAllGuestsByHotelId(@Param('hotel_id') hotel_id: any): Promise<Guest[]> {
        return await this.guestService.getAllByHotelId(hotel_id)
    }

    @Get('/:_id')
    async getGuest(@Param('_id') _id: any): Promise<Guest> {
        return await this.guestService.findById(_id)
    }

    @Patch('/:_id')
    async updateGuest(@Param('_id') _id: any, @Body() guest: any): Promise<Guest> {
        return await this.guestService.updateById(_id, guest)
    }

    // get count guests
    


}
