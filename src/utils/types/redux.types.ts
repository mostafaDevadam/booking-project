import { BOOKING_TYPE, ROOM_TYPE } from "./types"

export type ROOM_STATE_TYPE = ROOM_TYPE

export type BOOKING_STATE_TYPE = BOOKING_TYPE

export type HOTEL_STATE_TYPE = {
    _id?: any,
    name?: any,
    email?: any,
    password?: any,
    count_rooms?: any
    count_stocks?: any
    description?: any
}

export type GUEST_STATE_TYPE = {
    _id?: any,
    name?: any,
    email?: any,
    password?: any,
    address?: any
    gender?: any
    birth_date?: any
    amount?: any
}

type STATE_TYPE<T> = {
    data: T| T[], // data: { doc: T, List: T[]}
    loading: boolean,
    error: any,
}

type R_STATE_TYPE<T> = {
    data: { doc: T, List: T[]}
    loading: boolean,
    error: any,
}

export type REDUX_STATE_TYPE<T> = STATE_TYPE<T>
export type RX_STATE_TYPE<T> = R_STATE_TYPE<T>




export const redux_types = {}
