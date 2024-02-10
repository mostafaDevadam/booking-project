
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type ChatDocument = HydratedDocument<Chat>


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
export class Chat {

    @Prop({ default: 'tag' })
    tag: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: [true, 'Hotel is required'], })
    hotel: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Guest', required: [true, 'Guest Id is required'] })
    guest: MongooseSchema.Types.ObjectId


    constructor(chat?: Partial<Chat>) {
        Object.assign(this, chat)
    }

}

export const ChatSchema = SchemaFactory.createForClass(Chat)
