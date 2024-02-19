import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './booking';
import { RoomModule } from 'src/room/room.module';
import { NoteModule } from './note/note.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Booking.name, schema: BookingSchema}]),
    RoomModule,
    NoteModule
  ],
  controllers: [BookingController],
  providers: [BookingService]
})
export class BookingModule {}
