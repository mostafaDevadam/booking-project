import { IStorage_Booking } from "../shared/interfaces"
import { Booking } from "./booking"


export class StorageBooking implements IStorage_Booking {
    private bookings: Booking[] = []


    store(data: Booking): void {
        throw new Error("Method not implemented.")
    }
    getList() {
        throw new Error("Method not implemented.")
    }
    findOneById(_id: number): Booking {
        throw new Error("Method not implemented.")
    }
    findAll(): Booking[] {
        throw new Error("Method not implemented.")
    }




    storeBooking(booking: Booking): void {
        booking.set_id(this.bookings.length++)
        const total_price = (Number(booking.get_room().getPrice()) * booking.get_nights()).toString()
        booking.set_total_price(total_price)
        this.bookings.push(booking)
    }

    getBookings(): Booking[] {
        return this.bookings
    }

}
