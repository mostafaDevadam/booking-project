import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, } from "mongoose";

@Schema({ timestamps: true })
export class Booking {
    @Prop()
    start_date: string

    @Prop()
    end_date: string

    @Prop()
    check_in_date: string

    @Prop()
    check_out_date: string

    @Prop({default: false})
    is_paid: boolean

    @Prop({default: false})
    is_check_in: boolean

    @Prop({default: false})
    is_check_out: boolean

    @Prop({default: false})
    is_confirmed: boolean

    // ref
    @Prop({ type: Types.ObjectId, ref: 'Hotel' })
    hotel: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Guest' })
    guest: Types.ObjectId

    @Prop({ type: Types.ObjectId, ref: 'Room' })
    room: Types.ObjectId // if room is not booked

    @Prop()
    total_price: string

}


export const BookingSchema = SchemaFactory.createForClass(Booking)
