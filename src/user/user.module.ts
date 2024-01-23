import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { GuestModule } from './guest/guest.module';
import { UserService } from './user.service';

@Module({
    imports: [
        HotelModule,
        GuestModule,
    ],
    controllers: [],
    providers: [UserService],
    exports: [UserService]
  })
export class UserModule {}
