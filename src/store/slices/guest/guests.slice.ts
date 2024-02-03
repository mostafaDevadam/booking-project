import { createSlice } from "@reduxjs/toolkit";
import { GUEST_STATE_TYPE, RX_STATE_TYPE } from "../../../utils/types/redux.types";
import { GuestThunkFunctions } from "./guest.thunks";


const DEFAULT_REDUX_STATE: RX_STATE_TYPE<GUEST_STATE_TYPE> = {
    data: { doc: {}, List: [] },
    loading: false,
    error: null,
}

const initialState: RX_STATE_TYPE<GUEST_STATE_TYPE> = DEFAULT_REDUX_STATE


export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        setGuestState: (state, action) => { state.data.doc = action.payload },
        getOneGuestByIDState: (state) => { },
        setOneGuestByIDState: (state) => { },
        updateGuestByIDState: (state) => { },
        getGuestsListState: (state) => { },
        setGuestsListState: (state) => { },
    },
    extraReducers(builder) {
        builder.addCase(GuestThunkFunctions.createGuestByHotelId.pending, (state) => {
            state.loading = true
        })
            .addCase(GuestThunkFunctions.createGuestByHotelId.fulfilled, (state, action) => {
                state.loading = false
                state.data.doc = action.payload

            })
            .addCase(GuestThunkFunctions.createGuestByHotelId.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

        builder.addCase(GuestThunkFunctions.fetchAllGuestsByHotelId.pending, (state) => {
            state.loading = true
        })
            .addCase(GuestThunkFunctions.fetchAllGuestsByHotelId.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(GuestThunkFunctions.fetchAllGuestsByHotelId.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

            builder.addCase(GuestThunkFunctions.fetchGuestById.pending, (state) => {
                state.loading = true
            })
                .addCase(GuestThunkFunctions.fetchGuestById.fulfilled, (state, action) => {
                    state.loading = false
                    state.data.doc = action.payload

                })
                .addCase(GuestThunkFunctions.fetchGuestById.rejected, (state, action) => {
                    state.loading = false
                    state.error = action.error.message
                })
    },
})

export const GuestActions = guestSlice.actions
export const guestReducer = guestSlice.reducer
