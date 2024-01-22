import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, } from "mongoose";

export enum enum_room_type {
    single, double
}
@Schema({ timestamps: true })
export class Room {

    @Prop({required: false})
    size: string //{width: string, height: string}

    @Prop()
    room_number: string

    @Prop({ default: false})
    isBooked: boolean

    @Prop({enum: enum_room_type})
    room_type: enum_room_type

    /*@Prop()
    is_cleaned: boolean

    @Prop()
    cleaned_date: string*/

    @Prop()
    phone_number: string

    @Prop()
    price: string

    // ref
    @Prop({type: SchemaTypes.ObjectId,ref:'Hotel', required: true})
    hotel: Types.ObjectId


}

export const RoomSchema = SchemaFactory.createForClass(Room)


