import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AUTH_INPUT_TYPE } from './auth.types';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async auth_signup(@Body() data: AUTH_INPUT_TYPE){
        console.log("signup route:", data)
      return await this.authService.signUp(data)
    }


    @Post('signin')
    async auth_signin(@Body() data: AUTH_INPUT_TYPE){
        console.log("signin route:", data)
        return await this.authService.signIn(data)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req){
        return req.user
    }



}
