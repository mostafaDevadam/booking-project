import { getAllBookingsByHotelId } from './getAllBookingsByHotelId';

import {deleteBookingById} from './deleteBookingById'
import { getAllBookingsByGuestId } from './getAllBookingsByGuestId';
import { getAllBookingsByRoomId } from './getAllBookingsByRoomId';
import { getBookingById } from './getBookingById';
import { patchUpdateBookingById } from './patchBookingById';
import { patchChangeRoomInBookingByBookingIdAndRoomId } from './patchChangeRoomInBookingById';
import { postCreateBookingByHotelIdAndRoomIdAndGuestId } from './postCreateBookingByHotelRoomGuestId';



export const BookingService = {
    deleteBookingById,
    getAllBookingsByHotelId,
    getAllBookingsByGuestId,
    getAllBookingsByRoomId,
    getBookingById,
    patchUpdateBookingById,
    patchChangeRoomInBookingByBookingIdAndRoomId,
    postCreateBookingByHotelIdAndRoomIdAndGuestId,

}
