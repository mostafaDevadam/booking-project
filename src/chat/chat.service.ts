import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat';

@Injectable()
export class ChatService {

    constructor(
        @InjectModel(Chat.name)
        private readonly chatModel: Model<Chat>,
    ) { }


    createChat = async (data: any): Promise<ChatDocument> => {
        // const generate_doc = new this.chatModel(data)
        const chat = await this.chatModel.create(data)
        console.log("created_chat: ", chat)
        return chat
    }

    getChatById = async (_id: any): Promise<ChatDocument> => {
        return await this.chatModel.findById(_id)
    }

    getAllChatsByHotelId = async (hotel_id: any): Promise<ChatDocument[]> => {
        return await this.chatModel.find({ hotel: hotel_id })
    }

    getAllChatsByGuestId = async (guest_id: any): Promise<ChatDocument[]> => {
        return await this.chatModel.find({ guest: guest_id })
    }

    updateChatById = async (_id: any, data: any): Promise<ChatDocument> => {
        return await this.chatModel.findByIdAndUpdate(_id, data, { new: true})
    }

    removeChatById = async (_id: any): Promise<ChatDocument> => {
        // and remove related messages by chat_id
        return await this.chatModel.findByIdAndDelete(_id)
    }

    //
    checkIfChatIsExitingById = async (_id: any) => {
        const one =  await this.chatModel.exists({_id})
       console.log("chat existing: ", one)
        return one
    }
}
