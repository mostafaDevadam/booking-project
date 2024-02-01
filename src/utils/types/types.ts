import { KIND_OF_ROOM_ENUM } from "../enums/enums"

export type BOOKING_TYPE = {
    _id?: any,
    nights?: any
    start_date?: any
    end_date?: any
    checkedIn_date?: any
    checkedOut_date?: any
    paid_date?: string
    isPaid?: boolean
    isCheckedIn?: boolean
    isCheckedOut?: boolean
    isConfirmed?: boolean
    confirmed_date?: any
    total_price?: any
    // ref
    hotel?: any,
    room?: any | ROOM_TYPE,
    guest?: any,
}

export type ROOM_TYPE = {
    _id?: any,
    room_number?: any,
    size?: any
    isBooked?: any
    room_type?: KIND_OF_ROOM_ENUM
    isCleaned?: any
    cleaned_date?: any
    phone_number?: any
    price?: any
    // ref
    hotel?: any,
}

export type HOTEL_TYPE = {
    _id?: any,
    name?: any,
    email?: any,
    password?: any,
    count_rooms?: any
    count_stocks?: any
    description?: any
}
