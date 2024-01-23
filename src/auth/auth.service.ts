import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
//import { GuestService } from 'src/user/guest/guest.service';
import { HotelService } from 'src/user/hotel/hotel.service';
import { UserService } from 'src/user/user.service';
import { AUTH_INPUT_TYPE } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        private hotelService: HotelService,
        private userService: UserService,
        private jwtService: JwtService,
        ){}

        async signIn({role, email, password}: AUTH_INPUT_TYPE){
            console.log("sigin auth service:", {role, email, password})
            // call userService check role
            // if role is hotel->hotelByEmail || guest->guestByEmail
           //const hotel = await this.hotelService.findHotelByEmail(email)
           const user = await this.userService.findUserByEmail({role, email})
           if(user?.password !== password){
            throw new UnauthorizedException()
           }
           const payload = {_id: user._id, email: user.email}

           const token = await this.jwtService.signAsync(payload)
           payload['access_token'] = token
           return {payload}
        }

        async signUp({role, email, password}: AUTH_INPUT_TYPE): Promise<any> {
            // call userService
            // if role is hotel->create || guest->create
            const result = await this.userService.createUser({role, email, password})
            console.log("signup hotel: ", result)
            return result
        }
}
