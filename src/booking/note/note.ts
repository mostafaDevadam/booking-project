import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema, Types } from "mongoose";
import mongoose from 'mongoose'

export enum eAUTHOR_ROLE_ENUM {
    Hotel = 'Hotel',
    Guest = 'Guest',
}


export type NoteDocument = HydratedDocument<Note>

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
export class Note {

    @Prop({required: true})
    content: string

    @Prop({ enum: eAUTHOR_ROLE_ENUM, required: true })
    author_role: string

    @Prop({type: Boolean, default: false })
    isPublic: boolean

    // refs
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'author_role',
        required: true,
    })
    author: mongoose.Schema.Types.ObjectId

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
    })
    booking: mongoose.Schema.Types.ObjectId
}

export const NoteSchema = SchemaFactory.createForClass(Note)
