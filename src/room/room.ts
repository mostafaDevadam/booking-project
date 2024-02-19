import { eCOLOR, eROOM_SIZE } from "../shared/enums";
import { User } from "../users/user";

export class Room {
    private _id: number;
    private room_number: string;
    private room_color: eCOLOR;
    private room_size: eROOM_SIZE;
    private hotel: User;
    private price: string

    constructor(hotel: User, price: string, room_number: string, room_color: eCOLOR, room_size: eROOM_SIZE) {
        this.room_color = room_color
        this.room_number = room_number
        this.room_size = room_size
        this.hotel = hotel
        this.price = price
    }


    public set_id(_id: number): void {
        this._id = _id
    }

    get_id(): number {
        return this._id
    }

    public set_hotel(hotel: User): void {
        // this.hotel_id = hotel_id
        this.hotel = hotel
    }

    set_price(price: string): void {
        this.price = price
    }

    getPrice(): string {
        return this.price
    }

    public get_room_number(): string { return this.room_number }
    public get_room_color(): eCOLOR { return this.room_color }
    public get_room_size(): eROOM_SIZE { return this.room_size }


}
