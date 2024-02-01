import React from 'react'
import { BOOKING_TYPE } from '../utils/types/types'
type PROPS<T> = {
    bookings?: T[]
    booking?: T,
    //children?: any,
    /* fetchRoom: (e: any, _id: any) => {}
     updateRoom: (e: any, room: T) => {}
     removeRoom: (e: any, _id: any) => {}
     */
    openModal: (e: any, booking: T) => void
}


const BookingComponent: React.FC<PROPS<BOOKING_TYPE>> = ({ booking, openModal }) => {
    return (
        <div>
            {booking &&
                <div key={booking?._id} className='mt-3  p-3'>
                    <div className="bg-light p-4"
                        onClick={(e) => openModal(e, booking)}
                    >
                        <p>{booking?.nights}</p>
                    </div>
                </div>
            }
        </div>
    )
}

export default BookingComponent
