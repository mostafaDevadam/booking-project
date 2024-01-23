import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { secret, JWTConstants } from '../../constants';
import { UserModule } from 'src/user/user.module';
import { HotelModule } from 'src/user/hotel/hotel.module';

@Module({
  imports: [

    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: JWTConstants.secret,
      //signOptions: { expiresIn: '60s'}
    }),
    ConfigModule.forRoot(),
    UserModule,
    HotelModule,

  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
