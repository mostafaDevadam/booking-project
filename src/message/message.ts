import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";

import mongoose from 'mongoose'


export type MessageDocument = HydratedDocument<Message>

export enum ROLE {
    Hotel = 'Hotel',
    Guest = 'Guest',
}


@Schema({
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        versionKey: false,
    },
    toObject: {
        versionKey: false,
    },

})
export class Message {

    @Prop({
        required: [true, 'Message is required']
    })
    message: string

    @Prop({ enum: ROLE, required: true })
    sender_role: string

    @Prop({ enum: ROLE, required: true })
    receiver_role: string


    // ref
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'sender_role',
        required: true,
    })
    sender: mongoose.Schema.Types.ObjectId;


    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'receiver_role',
        required: true,
    })
    receiver: mongoose.Schema.Types.ObjectId;

   /* @Prop({
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'sender_role',
    })
    man: mongoose.Schema.Types.ObjectId;*/

    // chat ref
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Chat', required: [true, 'Chat Id is required'] })
    chat: MongooseSchema.Types.ObjectId

    //
    /*constructor(message?: Partial<Message>) {
        Object.assign(this, message)
    }*/



}

export const MessageSchema = SchemaFactory.createForClass(Message)



