import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './booking';
import { Model } from 'mongoose';
import { RoomService } from 'src/room/room.service';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>,
        private readonly roomService: RoomService,
    ) { }

    //!Advanced
    async create(hotel_id: any, room_id: any, guest_id: any, data: BookingDocument) {
        data.hotel = hotel_id
        data.room = room_id
        data.guest = guest_id
        // get room by id and check if it's booked
        // then return msg = 'can't book because it's already booked'
        // else book the room -> update the room: isBooked = true and create the booking doc
        const isBooked = await this.roomService.checkRoomIsBooked(room_id)
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

    async findAll() {
        return this.bookingModel.find().exec()
    }
    async findOneById(_id) {
        return this.bookingModel.findById(_id)
    }

    async findAllByHotelId(hotel_id) {
        return this.bookingModel.find({ hotel: hotel_id }).exec()
    }


    async findAllByRoomId(room_id) {
        return this.bookingModel.find({ room: room_id }).exec()
    }

    async findAllByGuestId(guest_id) {
        return this.bookingModel.find({ guest: guest_id }).exec()
    }

    //!Advanced
    // update: can change room
    async changeRoomInBooking(booking_id: any, room_id: any) {
        const new_room_id = room_id
        //1. get booking by _id
        const booking = await this.findOneById(booking_id)
        if (!booking) return { error: "can't change the room in booking" }
        const old_room_id = booking.room
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


    async updateOne(_id: any, data: any) {
        return this.bookingModel.findByIdAndUpdate(_id, data, { new: true, })
    }

    //!Advanced
    async removeOne(booking_id: any, room_id: any) {
        // get booking by _id, room_id
        const booking = await this.bookingModel.findOne({ _id: booking_id, room: room_id })//.exists()
        //console.log("booking: ", booking)
        if (booking) {
            // if booking ist exist
            //then update room -> isBooked = false
            const updated_room = await this.roomService.updateOne(room_id, { isBooked: false })
            // and remove booking
            return await this.bookingModel.findByIdAndDelete(booking_id)
        }

    }


    // private
    private async calculateTotalPrice(room_id, nights) {
        const room = await this.roomService.findOneById(room_id)
        const total_price = String(Number(room?.price) * nights)
        return total_price.toString()
    }












}
