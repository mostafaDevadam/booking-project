import { createSlice } from "@reduxjs/toolkit";
import { BOOKING_STATE_TYPE, REDUX_STATE_TYPE, RX_STATE_TYPE } from "../../../utils/types/redux.types";
import { BookingThunkFunctions } from "./thunks/booking.thunks";



const DEFAULT_REDUX_STATE: RX_STATE_TYPE<BOOKING_STATE_TYPE> = {
    data: { doc: {}, List: [] },
    loading: false,
    error: null,
    // selected, update, isRemove,
}
const initialState: RX_STATE_TYPE<BOOKING_STATE_TYPE> = DEFAULT_REDUX_STATE

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: initialState,
    reducers: {
        setBookingState: (state, action) => {state.data.doc = action.payload },
        getOneBookingByIdState: (state) => { },
        setOneBookingByIdState: (state, action) => { },
        updateBookingState: (state) => { },
        changeRoomInBookingState: (state) => { },
        getBookingsListState: (state) => { },
        setBookingsListState: (state, action) => { state.data.List = action.payload },
        getBookingsListByRoomIdState: (state) => { },
        setBookingsListByRoomIdState: (state) => { },
        getBookingsListByHotelIdState: (state) => { },
        setBookingsListByHotelIdState: (state) => { },
        getBookingsListByGuestIdState: (state) => { },
        setBookingsListByGuestIdState: (state) => { },
    },
    extraReducers(builder) {
        builder.addCase(BookingThunkFunctions.fetchAllBookingsByHotelId.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.fetchAllBookingsByHotelId.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.List = action.payload
                })
            .addCase(BookingThunkFunctions.fetchAllBookingsByHotelId.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })
        builder.addCase(BookingThunkFunctions.fetchAllBookingsByRoomId.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.fetchAllBookingsByRoomId.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.List = action.payload
                })
            .addCase(BookingThunkFunctions.fetchAllBookingsByRoomId.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })

        builder.addCase(BookingThunkFunctions.fetchAllBookingsByGuestId.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.fetchAllBookingsByGuestId.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.List = action.payload
                })
            .addCase(BookingThunkFunctions.fetchAllBookingsByGuestId.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })

        builder.addCase(BookingThunkFunctions.fetchOneBookingById.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.fetchOneBookingById.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload
                })
            .addCase(BookingThunkFunctions.fetchOneBookingById.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })


        builder.addCase(BookingThunkFunctions.changeRoomInBookingByIdAndRoomId.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.changeRoomInBookingByIdAndRoomId.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload
                })
            .addCase(BookingThunkFunctions.changeRoomInBookingByIdAndRoomId.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })


        builder.addCase(BookingThunkFunctions.updateBookingById.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.updateBookingById.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload
                })
            .addCase(BookingThunkFunctions.updateBookingById.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })

        builder.addCase(BookingThunkFunctions.createBooking.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.createBooking.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload
                })
            .addCase(BookingThunkFunctions.createBooking.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })


        builder.addCase(BookingThunkFunctions.removeBookingsById.pending,
            (state) => {
                state.loading = true
            })
            .addCase(BookingThunkFunctions.removeBookingsById.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload
                })
            .addCase(BookingThunkFunctions.removeBookingsById.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })

    },
})

export const BookingActions = bookingSlice.actions
export const bookingReducer = bookingSlice.reducer
