import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message';
import { MessageService } from './message.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [
   MongooseModule.forFeature([{name: Message.name, schema: MessageSchema}]),
   ChatModule,

  ],
  providers: [MessageGateway, MessageService],
  exports: [],
})
export class MessageModule {}
