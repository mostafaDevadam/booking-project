import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {  } from '@nestjs/websockets'
import { IoAdapter } from '@nestjs/platform-socket.io';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v0')
  app.enableCors()
  app.useWebSocketAdapter(new IoAdapter())
  
  await app.listen(process.env.PORT);
}
bootstrap();
