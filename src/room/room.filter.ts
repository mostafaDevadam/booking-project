import { Specification, Specification_G } from "../shared/abstracts";
import { IFilter_Room } from "../shared/interfaces";
import { Room } from "./room";

export class FilterRoom implements IFilter_Room {
    filter(rooms: Room[], specification: Specification_G<Room>): Room[] {
        return rooms.filter(room => specification.isValid(room))
    }
}
