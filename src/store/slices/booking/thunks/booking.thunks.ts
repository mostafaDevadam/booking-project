import { createAsyncThunk } from "@reduxjs/toolkit"
import { BookingService } from "../../../../services/api/requests/booking/booking.service"
import { BOOKING_STATE_TYPE } from "../../../../utils/types/redux.types"

const createBooking = createAsyncThunk('booking/create',
    async (data: BOOKING_STATE_TYPE) => {
        return await BookingService.postCreateBookingByHotelIdAndRoomIdAndGuestId(
            data.hotel,
            data.room,
            data.guest,
            data
        )
    })


const updateBookingById = createAsyncThunk('booking/update',
    async (data: BOOKING_STATE_TYPE) => {
        return await BookingService.patchUpdateBookingById(
            data._id,
            data
        )
    })

const changeRoomInBookingByIdAndRoomId = createAsyncThunk('booking/change/room',
    async ({booking_id, room_id}: any) => {
        return await BookingService.patchChangeRoomInBookingByBookingIdAndRoomId(
            booking_id,
            room_id
        )
    })

const fetchOneBookingById = createAsyncThunk('booking/one',
    async (_id: any) => {
        return await BookingService.getBookingById(_id)
    })

const fetchAllBookingsByHotelId = createAsyncThunk('booking/all/hotel',
    async (hotel_id: any) => {
        return await BookingService.getAllBookingsByHotelId(hotel_id)
    })

const fetchAllBookingsByRoomId = createAsyncThunk('booking/all/room',
    async (room_id: any) => {
        return await BookingService.getAllBookingsByRoomId(room_id)
    })

const fetchAllBookingsByGuestId = createAsyncThunk('booking/all/guest',
    async (guest_id: any) => {
        return await BookingService.getAllBookingsByGuestId(guest_id)
    })

const removeBookingsById = createAsyncThunk('booking/remove',
    async ({ booking_id, room_id }: any) => {
        return await BookingService.deleteBookingById(booking_id, room_id)
    })


export const BookingThunkFunctions = {
    createBooking,
    updateBookingById,
    changeRoomInBookingByIdAndRoomId,
    fetchOneBookingById,
    fetchAllBookingsByHotelId,
    fetchAllBookingsByRoomId,
    fetchAllBookingsByGuestId,
    removeBookingsById,

}
