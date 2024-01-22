import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './hotel';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Hotel.name, schema: HotelSchema}])
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
