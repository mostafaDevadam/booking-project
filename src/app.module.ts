import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HotelModule } from './user/hotel/hotel.module';
import { GuestModule } from './user/guest/guest.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/assets/images'), //'/files'),
      renderPath: 'uploads',
      exclude: ['/api/(.*)']
     }),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_LOCAL),
    AuthModule,
    //HotelModule,
   // GuestModule,
    RoomModule,
    BookingModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
