import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose'
import { HydratedDocument } from 'mongoose';

export type FeedBackDocument = HydratedDocument<Feedback>

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
export class Feedback {

    @Prop({ required: true })
    content: string

    // refs
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
    hotel: mongoose.Schema.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Guest', required: true })
    guest: mongoose.Schema.Types.ObjectId

}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)
