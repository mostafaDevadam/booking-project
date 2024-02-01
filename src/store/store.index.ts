import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/user.slice";
import { guestReducer } from "./slices/guests.slice";
import { hotelReducer } from "./slices/hotel.slice";
import { roomReducer } from "./slices/room.slice";
import { bookingReducer } from "./slices/booking/booking.slice";
import { apiSlice } from "./slices/api.slice";


export const store = configureStore({
    reducer: {
      user: userReducer,
      hotel: hotelReducer,
      guest: guestReducer,
      room: roomReducer,
      booking: bookingReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const RTK_Store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(apiSlice.middleware)

})

export type RTK_RootState = ReturnType<typeof RTK_Store.getState>

export type RTK_Dispatch = typeof RTK_Store.dispatch

