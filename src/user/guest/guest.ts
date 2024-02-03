import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {HydratedDocument, SchemaTypes, Types, } from "mongoose";



export type GuestDocument = HydratedDocument<Guest>

export enum enum_gender {
    male = 'male',
    female = 'female'
}

@Schema({ timestamps: true })
export class Guest {
    @Prop({ required: false })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: false })
    password: string

    @Prop({enum: enum_gender, required: false})
    gender: enum_gender

   /* @Prop()
    address: {
        //place_number: string,
        //street: string,
        city: string,
        // state: string,
        country: string,
    }*/

    @Prop()
    birth_date: string

    @Prop({ default: 2500 })
    amount: string

    //@Prop()
    //currency: string

    @Prop()
    phone_number: string

    //@Prop()
    //nationality: string

    // ref
    @Prop({type: SchemaTypes.ObjectId,ref:'Hotel', required: false})
    hotel: Types.ObjectId


}


export const GuestSchema = SchemaFactory.createForClass(Guest)
