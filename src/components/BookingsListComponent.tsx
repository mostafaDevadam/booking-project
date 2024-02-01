import React from 'react'
import BookingComponent from './BookingComponent'
import { BOOKING_TYPE } from '../utils/types/types'

type PROPS<T> = {
    bookings?: T[]
    booking?: T,
    //children?: any,
    fetchRoom?: (e: any, _id: any) => {}
    updateRoom?: (e: any, room: T) => {}
    removeRoom?: (e: any, _id: any) => {}
    openModal: (e: any, room: T) => void
}

const BookingsListComponent: React.FC<PROPS<BOOKING_TYPE>> = ({ bookings, openModal }) => (
    <>
        {bookings && bookings?.map((b: BOOKING_TYPE) => (
            <BookingComponent openModal={openModal} booking={b} />
        ))}
    </>
)


export default BookingsListComponent
