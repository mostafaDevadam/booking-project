import { eROOM_enum_type } from "./room"


export type ROOM_INPUT_TYPE = {
    size?: string
    room_number?: string
    isBooked?: boolean
    room_type?: eROOM_enum_type
    phone_number?: string
    price?: string
}
