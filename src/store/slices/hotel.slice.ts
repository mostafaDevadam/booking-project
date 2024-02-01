import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/interfaces/interfaces";
import { HOTEL_STATE_TYPE, REDUX_STATE_TYPE, RX_STATE_TYPE } from "../../utils/types/redux.types";



const initialState: RX_STATE_TYPE<HOTEL_STATE_TYPE> = {
    data: {doc: {}, List: []},
    loading: false,
    error: null,
}


export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        getHotel: (state) => {},
        setHotel: (state, action) => { state.data.doc = action.payload},
        getOneHotelByIDState: (state) => { },
        setOneHotelByIDState: (state, action) => { },
        updateHotelState: (state, action) => { },

    },
})

export const {setHotel, setOneHotelByIDState, updateHotelState} = hotelSlice.actions

export const hotelReducer = hotelSlice.reducer
