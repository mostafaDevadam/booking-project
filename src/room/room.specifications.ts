import { Specification } from "../shared/abstracts"
import { eCOLOR, eROOM_SIZE } from "../shared/enums"
import { Room } from "./room"

// color-spec
export class ColorSpecification extends Specification {

    private color: eCOLOR

    constructor(color: eCOLOR) {
        super()
        this.color = color
    }

    public isValid(room: Room): boolean {
        return room.get_room_color() === this.color
    }

}

// room_size_spec
export class RoomSizeSpecification extends Specification {

    private room_size: eROOM_SIZE

    constructor(room_size: eROOM_SIZE) {
        super()
        this.room_size = room_size
    }

    public isValid(room: Room): boolean {
        return room.get_room_size() === this.room_size
    }

}


// hotel_id


