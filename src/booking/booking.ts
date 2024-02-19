import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, model, Schema as MongooseSchema, HydratedDocument  } from 'mongoose';
import { Room, RoomSchema } from "src/room/room";

export type BookingDocument = HydratedDocument<Booking>

@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
    toJSON: {
        versionKey: false,
    },
    toObject: {
        versionKey: false,
    },


})
export class Booking {

    @Prop({required: true, default: 1})
    nights: number

    @Prop()
    start_date: string

    @Prop()
    end_date: string

    @Prop()
    checkedIn_date: string

    @Prop()
    checkedOut_date: string

    @Prop()
    paid_date: string

    @Prop({ default: false })
    isPaid: boolean

    @Prop({ default: false })
    isCheckedIn: boolean

    @Prop({ default: false })
    isCheckedOut: boolean

    @Prop({ default: false })
    isConfirmed: boolean

    @Prop()
    confirmed_date: string

    @Prop()
    total_price: string

    // expired_date: string
    // isExpired: boolean

    // ref
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
    hotel: MongooseSchema.Types.ObjectId

    @Prop({ type: SchemaTypes.ObjectId, ref: 'Guest', required: true })
    guest: Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', required: true })
    room: MongooseSchema.Types.ObjectId // if room is not booked



}


export const BookingSchema = SchemaFactory.createForClass(Booking)


BookingSchema.pre<Booking>('save', function (next) {
    // get room by id and check if it's booked
    // then return msg = 'can't book because it's already booked'
    // else book the room -> update the room: isBooked = true and create the booking doc
    //---------
    // calculate the total_price -> get price of room from room_doc and
    // total_price = room.price * nights

    if(this.nights){
        console.log("booking pre save: ", this)
        //this.total_price = String(this.nights * 30)
    }

    //const room = model("Room").findById(this.room._id)
    //console.log("pre save:", room)


    next()

    //return

})


BookingSchema.pre<Booking>('findOneAndDelete', function(next){

   // const room = model("Room").findById(this.room?._)
    //console.log("delete room doc from booking pre deleteOne:", room)

    next()
})
