import { Injectable } from '@nestjs/common';
import { HotelService } from './hotel/hotel.service';
import { GuestService } from './guest/guest.service';
import { Hotel, HotelDocument } from './hotel/hotel';
import { Guest, GuestDocument } from './guest/guest';
import { AUTH_INPUT_TYPE, eRULE_ENUM } from 'src/auth/auth.types';

@Injectable()
export class UserService {
    constructor(
        private hotelService: HotelService,
        private guestService: GuestService,
    ) { }


    async findUserByEmail({role, email}): Promise<HotelDocument | GuestDocument> {
        console.log(" findUserByEmail:", {role, email})
        if (role == "hotel") {
            const hotel = await this.hotelService.findHotelByEmail(email)
            return hotel
        } else if (role == "guest") {
            const guest = await this.guestService.findByEmail(email)
            return guest
        }
    }

    async createUser(data): Promise<Hotel | Guest> {
        const { role } = data
        if (role == eRULE_ENUM.hotel) {
            const hotel = await this.hotelService.createHotel(data)
            return hotel
        } else if (role == eRULE_ENUM.guest) {
            const guest = await this.guestService.create(data)
            return guest
        }
    }
}
