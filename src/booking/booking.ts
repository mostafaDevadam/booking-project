import { Room } from "../room/room"
import { User } from "../users/user"



export class Booking {
    private _id: number

    private hotel: User
    private guest: User
    private room: Room
    private nights: number
    private total_price: string

    constructor(nights: number, hotel: User, guest: User, room: Room) {
        this.hotel = hotel
        this.guest = guest
        this.room = room
        this.nights = nights
        //this.total_price = (Number(this.room.getPrice()) * nights).toString()
    }

    set_id(_id: number): void {
        this._id = _id
    }

    get_id(): number {
        return this._id
    }

    get_nights(): number {
        return this.nights
    }

    set_total_price(total_price: string): void {
        this.total_price = total_price
    }

    get_total_price(): string {
        return this.total_price
    }

    get_room(): Room {
        return this.room
    }

}

