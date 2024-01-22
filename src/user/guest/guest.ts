import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes, Types, } from "mongoose";

export enum enum_gender {
    male, female
}

@Schema({ timestamps: true })
export class Guest {
    @Prop({ required: false })
    name: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
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

    @Prop({ default: 25000 })
    amount: string

    //@Prop()
    //currency: string

    //@Prop()
    //phone_number: string

    //@Prop()
    //nationality: string


}


export const GuestSchema = SchemaFactory.createForClass(Guest)
