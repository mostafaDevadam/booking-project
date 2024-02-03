import { Prop, Schema, SchemaFactory,  } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types, } from "mongoose";


export type RoomDocument =  HydratedDocument<Room>

export enum eROOM_enum_type {
    single = "single",
    double = "double",
}
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
export class Room {

    @Prop({required: false})
    size: string //{width: string, height: string}

    @Prop({required: true, unique: true})
    room_number: string

    @Prop({ default: false})
    isBooked: boolean

    @Prop({enum: eROOM_enum_type, default: eROOM_enum_type.single})
    room_type: eROOM_enum_type

    @Prop({ default: true})
    isCleaned: boolean

    @Prop({default: new Date().toISOString()})
    cleaned_date: string

    @Prop()
    phone_number: string

    @Prop()
    price: string

    //@Prop()
    //currency: string

    // ref
    @Prop({type: SchemaTypes.ObjectId,ref:'Hotel', required: true})
    hotel: Types.ObjectId


}

export const RoomSchema = SchemaFactory.createForClass(Room)


RoomSchema.pre('save', function(){
   return
})
