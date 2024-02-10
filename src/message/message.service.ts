import { Injectable } from '@nestjs/common';
import { Message, MessageDocument } from './message';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name)
        private readonly messageModel: Model<Message>,
        private readonly chatService: ChatService,
    ){}


    async createMessage(data: any) {
        const msg = await this.messageModel.create(data)
        return msg
    }

    getAllMessagesByChatId = async (chat_id: any): Promise<MessageDocument[]> => {
        const all = await this.messageModel.find({chat: chat_id})
        return all
    }

    getMessageById = async (_id): Promise<MessageDocument> => {
        return await this.messageModel.findById(_id)
    }

    updateMessageById = async (_id: any, data: any) => {
        return await this.messageModel.findByIdAndUpdate(_id, data, {new: true})
    }

    removeMessageById = async (_id: any) => {
        return await this.messageModel.findByIdAndDelete(_id)
    }

}
