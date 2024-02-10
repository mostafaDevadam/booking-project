import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking';
import { Model } from 'mongoose';
import { RoomService } from 'src/room/room.service';
import { BOOKING_TYPE } from './booking.types';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>,
        private readonly roomService: RoomService,
    ) { }

    //!Advanced
    async create(hotel_id: any, room_id: any, guest_id: any, data: BookingDocument): Promise<BookingDocument | any> {
        data.hotel = hotel_id
        data.room = room_id
        data.guest = guest_id
        // get room by id and check if it's booked
        // then return msg = 'can't book because it's already booked'
        // else book the room -> update the room: isBooked = true and create the booking doc
        const isBooked = await this.roomService.checkRoomIsBooked(room_id)
        const isCleaned = await this.roomService.checkRoomIsCleaned(room_id)
         if(!isCleaned) return { error: "You can't book the room because it's not cleaned" }
        // check if room is cleaned then error: "You can't book the because it's not cleaned"
        console.log("isBooked", isBooked)
        if (isBooked) {
            return { error: "You can't book the room because it's already booked" }
        } else {
            // calculate total_price for booking
            //const room = await this.roomService.findOneById(room_id)
            //const total_price = String(Number(room?.price) * data.nights)
            data.total_price = await this.calculateTotalPrice(room_id, data.nights)

            const new_booking = await this.bookingModel.create(data)
            if (new_booking) {

                const updated_room = await this.roomService.updateOne(room_id, { isBooked: true, })
                console.log("updated_room", updated_room)
                console.log("new_booking", new_booking)
            }

            return new_booking
        }
    }

    // createManyBookings
    async createManyBookings(data: BOOKING_TYPE) { // hotel_id,guest_id,rooms, ...data
        return
    }

    async findAll(): Promise<BookingDocument[]> {
        return this.bookingModel.find().exec()
    }

    async findOneById(_id): Promise<BookingDocument | any> {
        const one = await (await this.bookingModel.findById(_id))
            .populate('room')
        return one
    }

    async findAllByHotelId(hotel_id): Promise<BookingDocument[]> {
        return this.bookingModel.find({ hotel: hotel_id }).exec()
    }


    async findAllByRoomId(room_id): Promise<BookingDocument[]> {
        return this.bookingModel.find({ room: room_id }).exec()
    }

    async findAllByGuestId(guest_id): Promise<BookingDocument[]> {
        return this.bookingModel.find({ guest: guest_id }).exec()
    }

    //!Advanced
    // update: can change room
    async changeRoomInBooking(booking_id: any, room_id: any): Promise<BookingDocument | any> {
        const new_room_id = room_id
        //1. get booking by _id
        const booking = await this.findOneById(booking_id)
        if (!booking) return { error: "can't change the room in booking" }
        const old_room_id = booking.room
        // check if room by new_room_id is not-booked
        const r = await this.roomService.findOneById(new_room_id)

        if (r.isBooked) return { error: "can't change the room in booking because it is already booked" }
        if (r.isCleaned) return { error: "can't change the room in booking because the new room is not cleaned" }



        //2. get room by old_room_id from booking and update it with isBooked = false
        const update_old_room = await this.roomService.updateOne(old_room_id, { isBooked: false })
        if (!update_old_room) return { error: "can't change the room in booking" }

        //3. update booking with new new_room_id
        const update_new_room = await this.roomService.updateOne(new_room_id, { isBooked: true })
        if (!update_new_room) return { error: "can't change the room in booking" }
        //4. update room by new_room_id with isBooked = true
        const update_booking = await this.updateOne(booking_id, { room: new_room_id })
        if (!update_booking) return { error: "can't change the room in booking" }

        return update_booking
    }


    async updateOne(_id: any, data: Partial<BookingDocument>) {
        console.log("before update booking: ", data)
        if (data.nights && data.room) {
            data.total_price = await this.calculateTotalPrice(data.room, data.nights)
            console.log("total_price update: ", data.total_price)
        }
        return this.bookingModel.findByIdAndUpdate(_id, data, { new: true })
    }

    //!Advanced
    async removeOne(booking_id: any, room_id: any) {
        console.log(booking_id, room_id)
        // get booking by _id, room_id
        const booking = await this.bookingModel.findOne({ _id: booking_id }) //, room: room_id })//.exists()
        //console.log("booking: ", booking)
        if(!booking) return { error: 'cannot remove it' }

        if (booking) {
            // if booking ist exist
            //then update room -> isBooked = false
            const updated_room = await this.roomService.updateOne(room_id, { isBooked: false })
            // and remove booking
            if (!updated_room) return { error: 'cannot remove it' }

            return await this.bookingModel.findByIdAndDelete(booking_id)
        }

    }


    // private
    private async calculateTotalPrice(room_id: any, nights: number) {
        const room = await this.roomService.findOneById(room_id)
        if (!room?.price) return ''
        const total_price = Number(room?.price) * nights
        console.log("total_price: ", room?.price, nights, typeof total_price, total_price)
        return total_price.toString()
    }












}
