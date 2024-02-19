import { Specification_G } from "../shared/abstracts";
import { IFilter_Booking } from "../shared/interfaces";
import { Booking } from "./booking";


export class FilterBooking implements IFilter_Booking {
    filter(rooms: Booking[], specification: Specification_G<Booking>): Booking[] {
        return rooms.filter(room => specification.isValid(room))
    }
}
