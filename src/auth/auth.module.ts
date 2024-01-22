import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { secret, JWTConstants } from '../../constants';

@Module({
  imports: [

    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: secret, //JWTConstants.secret,
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
