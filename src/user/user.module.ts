import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { GuestModule } from './guest/guest.module';

@Module({
    imports: [
        HotelModule,
        GuestModule,
    ],
    controllers: [],
    providers: []
  })
export class UserModule {}
