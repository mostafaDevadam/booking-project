import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards, } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDocument } from './note';
import { AuthGuard } from 'src/auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller('note')
export class NoteController {

    constructor(private readonly noteService: NoteService) { }


    // createNoteByBookingId
    @Post('/create/booking/:booking_id')
    async createNoteByBookingId(@Param('booking_id') booking_id: any, @Body() data: NoteDocument) {
        data.booking = booking_id
        return await this.noteService.createByBookingId(data)
    }

    // findAllNotesByBookingId
    @Get('/all/booking/:booking_id')
    async findAllNotesByBookingId(@Param('booking_id') booking_id: any) {
        return await this.noteService.findAllByBookingId(booking_id)
    }
    // findAllNotesByAuthorIdAsGuest if AuthorRole is 'Guest'
    @Get('/all/guest/:guest_id')
    async findAllNotesByAuthorIdAsGuest(@Param('guest_id') guest_id: any) {
        return await this.noteService.findAllByAuthorIdAsGuest(guest_id)
    }
    // findAllNotesByAuthorIdAsHotel if AuthorRole is 'Hotel'
    @Get('/all/hotel/:hotel_id')
    async findAllNotesByAuthorIdAsHotel(@Param('hotel_id') hotel_id: any) {
        return await this.noteService.findAllByAuthorIdAsHotel(hotel_id)
    }
    //findOneNoteById
    @Get('/:_id')
    async findOneNoteById(@Param('_id') _id: any) {
        return await this.noteService.findOneById(_id)
    }
    //updateNoteById
    @Patch('/:_id')
    async updateNoteById(@Param('_id') _id: any, @Body() data: NoteDocument) {
        return await this.noteService.updateById(_id, data)
    }
    // removeNoteById
    @Delete('/:_id')
    async removeNoteById(@Param('_id') _id: any) {
        return await this.noteService.removeById(_id)
    }
}
