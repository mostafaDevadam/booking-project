import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument, eROOM_enum_type } from './room';
import { Types } from 'mongoose';

@Injectable()
export class RoomService {
    constructor(
        @InjectModel(Room.name)
        private readonly roomModel: Model<Room>
    ) { }


    async create(hotel_id: any, data: RoomDocument) {
        data.hotel = hotel_id
        // generate room_number:
        // get the last document
        //const room = await this.roomModel.find().limit(1).sort({ $natural: -1 })
        //const room_ = room[0]
        //const room_num = Number(room_.room_number) + 1
        //console.log('last room:', room_num)

        // get count rooms by hotel_id
        const count = await this.roomModel.countDocuments() // find().countDocuments()
        console.log('count rooms:', count, (count + 1))
        data.room_number = (count + 1).toString()
        return await this.roomModel.create(data)
    }

    async findAll() {
        return this.roomModel.find().exec()
    }
    async findOneById(_id): Promise<RoomDocument> {
        return this.roomModel.findById(_id)
    }

    /*async findOneByGuestId() {
        return
    }*/

    async findAllByHotelId(hotel_id) {
        return this.roomModel.find({ hotel: hotel_id }).exec()
    }
    /*
    async findAllByGuestId(guest_id) {
        return
    }*/

    async findAllAvailableRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, isBooked: false }).exec()
        return all
    }

    async findAllAvailable(): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ isBooked: false }).exec()
        console.log("all findAllAvailable:", all)
        return all
    }

    async findAllBookedRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, isBooked: true }).exec()
        return all
    }

    async findAllIsBooked(): Promise<RoomDocument[]> {
        return await this.roomModel.find({ isBooked: true }).exec()
    }

    async findAllCleanedRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, isCleaned: true }).exec()
        return all
    }
    async findAllCleaned(): Promise<RoomDocument[]> {
        return await this.roomModel.find({ isCleaned: true }).exec()
    }

    async findAllNotCleanedRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, isCleaned: false }).exec()
        return all
    }
    async findAllNotCleaned(): Promise<RoomDocument[]> {
        return await this.roomModel.find({ isCleaned: false }).exec()
    }

    async findAllSingleRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, room_type: eROOM_enum_type.single }).exec()
        return all
    }

    async findAllSingle() {
        return await this.roomModel.find({ room_type: eROOM_enum_type.single }).exec()
    }

    async findAllDoubleRoomsByHotelId(hotel_id): Promise<RoomDocument[]> {
        const all = await this.roomModel.find({ hotel: hotel_id, room_type: eROOM_enum_type.double }).exec()
        return all
    }
    async findAllDouble() {
        return await this.roomModel.find({ room_type: eROOM_enum_type.double }).exec()
    }

    async findOneByRoomNumber(room_number: string) {
        return await this.roomModel.findOne({ room_number: room_number })
    }

    async updateOne(_id: any, data: any) {
        return await this.roomModel.findByIdAndUpdate(_id, data, { new: true })
    }

    //! can't remove room if it's booked
    async removeOne(_id: any) {
        // get room
        // check if room is booked
        // then return 'cannot remove it
        // else remove it
        const isBooked = await this.checkRoomIsBooked(_id)
        if (isBooked) return { error: 'cannot remove it' }
        return await this.roomModel.findByIdAndDelete(_id)
    }

    checkRoomIsBooked = async (_id: any) => {
        const room = await this.findOneById(_id)
        console.log("checkRoomIsBooked room:", room)
        return room.isBooked //? true : false
    }

    checkRoomIsCleaned = async (_id: any) => {
        const room = await this.findOneById(_id)
        console.log("checkRoomIsCleaned room:", room)
        return room.isCleaned //? true : false
    }
    //
    insertMany = async () => {
        const hotel_ids = ["65aee26575e0be677b51126c", "65aee7fcc048a97c8244f033",
            "65afd368a60f21acd2744c42", "65b241db49f7c3dd13c80976"]
        const count = 10


        const hotel_id = hotel_ids[3]

        const numOfDocs = await this.roomModel.countDocuments() //.where('hotel', hotel_id)

        /*const room: any = {
            room_number: "24", //(Math.floor(Math.random() * 1000) + numOfDocs).toString(),
            room_type: eROOM_enum_type.single,
             hotel: hotel_id, //new Types.ObjectId(hotel_id),
        }

        console.log("room: ", room)*/

        //await this.create(hotel_id, room)
        //const r = new this.roomModel(room , { $out: true})
        // await this.roomModel.create(room)


        for (let i = 1; i <= count; i++) {

            console.log(`hotel ${hotel_id} ${i} ,
             count: ${numOfDocs},
             increment: ${numOfDocs + i}`)
            const num = numOfDocs + i


            const room: any = {
                room_number: (Math.floor(Math.random() * 1000 * num + i)).toString(),
                room_type: eROOM_enum_type.single,
                hotel: hotel_id,
            }

            console.log("room: ", room)


            await this.roomModel.create(room)



        }


        /*for(const hotel_id of hotel_ids){
            const numOfDocs = await this.roomModel.countDocuments().where('hotel', hotel_id)


        }*/
    }

}
