import { Module } from '@nestjs/common';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestSchema } from './guest';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Guest', schema: GuestSchema}])
  ],
  controllers: [GuestController],
  providers: [GuestService],
  exports: [GuestService],
})
export class GuestModule {}
