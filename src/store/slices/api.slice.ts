import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/interfaces/interfaces";
import { HOTEL_STATE_TYPE, REDUX_STATE_TYPE, RX_STATE_TYPE } from "../../utils/types/redux.types";
import { createApi, fetchBaseQuery, FetchArgs,  } from '@reduxjs/toolkit/query/react'
import { API_HOST } from "../../constants";
import { buildHeader } from "../../services/api/callAPI";
import { AuthService } from "../../services/auth.service";

const base_url = API_HOST

const initialState: any = {
    data: {},
    loading: false,
    error: null,
}

const content = () => {
    return { baseUrl: base_url, headers: buildHeader().then(th => th) }

}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: base_url,
        prepareHeaders: async (headers, {getState}) => {
            headers.set('auth-token', await AuthService.getToken())
            return headers
        },
    }),
    endpoints: builder => ({
        getBookings: builder.query({
            query: () => 'booking/all',

        })
    }),
})

export const { useGetBookingsQuery } = apiSlice

