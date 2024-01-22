import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes, Types, } from "mongoose";


export type HotelDocument = HydratedDocument<Hotel>

@Schema({
    timestamps: true,
    toObject: {
        // delete __v from output object
        versionKey: false,
    },
    toJSON: {
        // remove __v from output JSON
        versionKey: false,
    },
})
export class Hotel {

    @Prop({ required: false })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    /*@Prop()
    address: {
        // place_number: string,
        // street: string,
        // post_code: string,
        city: string,
        // state: string,
        country: string,
    }*/

    // @Prop()
    // phone_number: string

    @Prop({ default: 0 })
    count_rooms: number

    @Prop({ default: 0 })
    count_stocks: number

    @Prop()
    description: string

    //@Prop()
    //isLive: boolean

    //@Prop()
    //rates: number



}


export const HotelSchema = SchemaFactory.createForClass(Hotel)
