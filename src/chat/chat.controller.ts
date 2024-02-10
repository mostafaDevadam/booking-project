import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChatDocument } from './chat';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService) {}


    @Get('all/hotel/:hotel_id')
    async getAllChatsByHotelId(@Param('hotel_id') hotel_id: any): Promise<ChatDocument[]> {
        return await this.chatService.getAllChatsByHotelId(hotel_id)
    }

    @Get('all/guest/:guest_id')
    async getAllChatsByGuestId(@Param('guest_id') guest_id: any): Promise<ChatDocument[]> {
        return await this.chatService.getAllChatsByGuestId(guest_id)
    }

    @Get('/:_id')
    async getChatById(@Param('_id') _id: any): Promise<ChatDocument> {
        return await this.chatService.getChatById(_id)
    }


    @Patch('/:_id')
    async updateChatById(@Param('_id') _id: any, data: any): Promise<ChatDocument> {
         const result = await this.chatService.updateChatById(_id, data)
        return result

    }





    // getAllChatsByHotelId
    // getAllByGuestId
    // getChatById
    // updateChatById
}
