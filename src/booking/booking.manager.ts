import { Room } from "../room/room"
import { eUSER_ROLE } from "../shared/enums"
import { IBooking_Manager } from "../shared/interfaces"
import { User } from "../users/user"
import { Booking } from "./booking"


export class BookingManager implements IBooking_Manager {
    create(data: Booking): false | Booking {
        throw new Error("Method not implemented.")
    }
    update(_id: number, data: Booking): false | Booking {
        throw new Error("Method not implemented.")
    }
    remove(_id: number) {
        throw new Error("Method not implemented.")
    }

    createBooking(nights: number, hotel: User, guest: User, room: Room): Booking | false {
        if (hotel.get_role() === eUSER_ROLE.HOTEL && guest.get_role() === eUSER_ROLE.GUEST) {
            const b: Booking = new Booking(nights, hotel, guest, room)
            // b.set_total_price((Number(room.getPrice()) * nights).toString())
            return b
        }
        return false

    }

}
