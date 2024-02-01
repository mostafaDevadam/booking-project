import { createSlice } from "@reduxjs/toolkit";
import { IGuest, IUser } from "../../utils/interfaces/interfaces";
import { GUEST_STATE_TYPE, REDUX_STATE_TYPE } from "../../utils/types/redux.types";

const initialState: REDUX_STATE_TYPE<GUEST_STATE_TYPE> = {
    data: {},
    loading: false,
    error: null,
}

export const guestSlice = createSlice({
    name: 'guest',
    initialState,
    reducers: {
        getOneGuestByIDState: (state) => { },
        setOneGuestByIDState: (state) => { },
        updateGuestByIDState: (state) => { },
        getGuestsListState: (state) => { },
        setGuestsListState: (state) => { },
    },
})


export const guestReducer = guestSlice.reducer
