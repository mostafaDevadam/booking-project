import { eCOLOR, eROOM_SIZE, eUSER_ROLE } from "../shared/enums"
import { IRoom_Manager } from "../shared/interfaces"
import { User } from "../users/user"
import { Room } from "./room"

export class RoomManager implements IRoom_Manager {
    create(data: Room) {
        return data
    }
    update(_id: number, data: any) {
        throw new Error("Method not implemented.")
        return data
    }
    remove(_id: number) {
        throw new Error("Method not implemented.")
        return {}
    }

    createRoom(hotel: User, price: string, room_number: string, room_color: eCOLOR, room_size: eROOM_SIZE): Room | false {
        if (hotel.get_role() === eUSER_ROLE.HOTEL) {
            return new Room(hotel, price, room_number, room_color, room_size)
        }

        return false
    }
}
