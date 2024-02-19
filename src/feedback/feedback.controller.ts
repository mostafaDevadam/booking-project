import { Body, Controller, Post, Get, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { FeedBackDocument } from './feedback';

//@UseGuards(AuthGuard)
@Controller('feedback')
export class FeedbackController {
    constructor(private readonly feedbackService: FeedbackService) { }

    @Post('/create/guest/:guest_id/hotel/:hotel_id')
    async createFeedbackByGuestId(@Param('guest_id') guest_id: any, @Param('hotel_id') hotel_id: any, @Body() data: FeedBackDocument) {
        data.guest = guest_id
        data.hotel = hotel_id
        return await this.feedbackService.create(data)
    }

    @Get('/all')
    async findAllFeedbacks() {
        return await this.feedbackService.findAll()
    }

    @Get('/all/hotel/:hotel_id')
    async findAllFeedbacksByHotelId(@Param('hotel_id') hotel_id: any) {
        return await this.feedbackService.findAllByHotelId(hotel_id)
    }

    @Get('/all/guest/:guest_id')
    async findAllFeedbacksByGuestId(@Param('guest_id') guest_id: any) {
        return await this.feedbackService.findAllByGuestId(guest_id)
    }

    @Get('/:_id')
    async findOneFeedbackById(@Param('_id') _id: any) {
        return await this.feedbackService.findOneById(_id)
    }

    @Patch('/:_id')
    async updateFeedbackById(@Param('_id') _id: any, @Body() data: FeedBackDocument) {
        return await this.feedbackService.updateById(_id, data)
    }

    @Delete('/:_id')
    async removeFeedbackById(@Param('_id') _id: any) {
        return await this.feedbackService.removeById(_id)
    }


}
