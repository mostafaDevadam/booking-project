import { ActionReducerMapBuilder, AsyncThunk, PayloadAction, createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { REDUX_STATE_TYPE, ROOM_STATE_TYPE, RX_STATE_TYPE } from "../../utils/types/redux.types";
import { RoomService } from "../../services/api/requests/room/room.service";
import { ROOM_TYPE } from "../../utils/types/types";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";



const fetchRoomsByHotel = createAsyncThunk('rooms/all/hotel',
    async (hotel_id: any) => {
        return await RoomService.getAllRoomsByHotelId(hotel_id)
    }
)


const fetchAllAvailableRooms = createAsyncThunk('rooms/all/available',
    async () => {
        const result = await RoomService.getAllAvailableRooms()
        console.log("fetchAllAvailableRooms: ", result)

        return result
    }
)

const fetchAllBookedRooms = createAsyncThunk('rooms/all/booked',
    async () => {
        return await RoomService.getAllBookedRooms()
    }
)

const fetchAllCleanedRooms = createAsyncThunk('rooms/all/cleaned',
    async () => {
        return await RoomService.getAllCleanedRooms()
    }
)

const fetchAllNotCleanedRooms = createAsyncThunk('rooms/all/not/cleaned',
    async () => {
        return await RoomService.getAllNotCleanedRooms()
    }
)


const fetchAllSingleRooms = createAsyncThunk('rooms/all/single',
    async () => {
        return await RoomService.getAllSingleRooms()
    }
)

const fetchAllDoubleRooms = createAsyncThunk('rooms/all/double',
    async () => {
        return await RoomService.getAllDoubleRooms()
    }
)

const fetchRoomById = createAsyncThunk('rooms/one',
    async (_id: any) => {
        return await RoomService.getOneRoomById(_id)
    }
)

const updateRoomById = createAsyncThunk('rooms/update',
    async (data: ROOM_STATE_TYPE) => {
        return await RoomService.patchRoomById(data._id, data)
    }
)

const removeRoomById = createAsyncThunk('rooms/remove',
    async (_id: any) => {
        return await RoomService.deleteRoomById(_id)
    }
)

const createRoomByHotelId = createAsyncThunk('rooms/create',
    async (data: ROOM_STATE_TYPE) => {
        return await RoomService.postCreateRoomByHotelId(data.hotel, data)
    }
)
// allBookedRooms, allAvailableRooms, allCleanedRooms, allNotCleanedRooms,
// allSingleRooms, allDoubleRooms,
const DEFAULT_REDUX_STATE: RX_STATE_TYPE<ROOM_STATE_TYPE> = {
    data: { doc: {}, List: [] },
    loading: false,
    error: null,
}

const initialState: RX_STATE_TYPE<ROOM_STATE_TYPE> = DEFAULT_REDUX_STATE


export const roomSlice = createSlice({
    name: 'room',
    initialState: initialState,
    reducers: {
        getRoomState: (state) => { },
        setRoomState: (state, action) => { state.data.doc = action.payload },
        getRoomByIdState: (state, action) => { state.data.doc = state.data.List.filter((fl) => fl._id == action.payload._id)[0] },
        updateRoomState: (state) => { },
        //setRoomState: (state) => {},
        getRoomsState: (state) => { },
        setRoomsState: (state, action) => { state.data.List = action.payload },
        getRoomsByHotelIdState: (state) => { },
        setRoomsByHotelIdState: (state) => { },
        getAvailableRoomsByHotelIdState: (state) => { },
        setAvailableRoomsByHotelIdState: (state) => { },
        getCleanedRoomsByHotelIdState: (state) => { },
        setCleanedRoomsByHotelIdState: (state) => { },
        getNotCleanedRoomsByHotelIdState: (state) => { },
        setNotCleanedRoomsByHotelIdState: (state) => { },
        getBookedRoomsByHotelIdState: (state) => { },
        setBookedRoomsByHotelIdState: (state) => { },
        getSingleRoomsByHotelIdState: (state) => { },
        setSingleRoomsByHotelIdState: (state) => { },
        getDoubleRoomsByHotelIdState: (state) => { },
        setDoubleRoomsByHotelIdState: (state) => { },
    },
    extraReducers(builder) {

        builder.addCase(createRoomByHotelId.pending, (state) => {
            state.loading = true
        })
            .addCase(createRoomByHotelId.fulfilled, (state, action) => {
                state.loading = false
                state.data.doc = action.payload

            })
            .addCase(createRoomByHotelId.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

        builder.addCase(updateRoomById.pending, (state) => {
            state.loading = true
        })
            .addCase(updateRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.data.doc = action.payload

            })
            .addCase(updateRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })




        builder.addCase(fetchRoomById.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.data.doc = action.payload

            })
            .addCase(fetchRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


        builder.addCase(removeRoomById.pending, (state) => {
            state.loading = true
        })
            .addCase(removeRoomById.fulfilled, (state, action) => {
                state.loading = false
                state.data.doc = action.payload

            })
            .addCase(removeRoomById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //
        builder.addCase(fetchRoomsByHotel.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchRoomsByHotel.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchRoomsByHotel.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        /*
        fetchAllAvailableRooms
        */

        builder.addCase(fetchAllAvailableRooms.pending, (state) => {
            console.log("builder fetchAllAvailableRooms 1")
            state.loading = true
        })
            .addCase(fetchAllAvailableRooms.fulfilled, (state, action) => {
                console.log("builder fetchAllAvailableRooms 2")
                state.loading = false
                state.data.List = action.payload
                console.log("builder fetchAllAvailableRooms 2: ", action.payload)

            })
            .addCase(fetchAllAvailableRooms.rejected, (state, action) => {
                console.log("builder fetchAllAvailableRooms 3")
                state.loading = false
                state.error = action.error.message
            })


        builder.addCase(fetchAllBookedRooms.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAllBookedRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchAllBookedRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })


        builder.addCase(fetchAllCleanedRooms.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAllCleanedRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchAllCleanedRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        // fetchAllNotCleanedRooms
        builder.addCase(fetchAllNotCleanedRooms.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAllNotCleanedRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchAllNotCleanedRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })

        // fetchAllSingleRooms
        builder.addCase(fetchAllSingleRooms.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAllSingleRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchAllSingleRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        // fetchAllDoubleRooms
        builder.addCase(fetchAllDoubleRooms.pending, (state) => {
            state.loading = true
        })
            .addCase(fetchAllDoubleRooms.fulfilled, (state, action) => {
                state.loading = false
                state.data.List = action.payload

            })
            .addCase(fetchAllDoubleRooms.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
        //  builder.addCase(thunk(removeRoomById), (state) => {})

        /* builder.addCase(removeRoomById.pending, (state, action) => cb(state, action))
         builder.addCase(removeRoomById.fulfilled, (state, action) => cb(state, action))
         builder.addCase(removeRoomById.rejected, (state, action) => cb(state, action))

         builder.addCase(fetchRoomsByHotel.pending, cb)
         builder.addCase(fetchRoomsByHotel.fulfilled, cb)
         builder.addCase(fetchRoomsByHotel.rejected, cb)*/


    },
})

const thunk = (el: AsyncThunk<any, any, AsyncThunkConfig>) => {
    return el.pending
}

enum Request_Status_enum {
    pending = 'pending',
    fulfilled = 'fulfilled',
    rejected = 'rejected',
}

const lb: { [key in Request_Status_enum]: string } = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected'
}

type ACTION = PayloadAction<any | undefined, string, {
    arg: any;
    requestId: string;
    requestStatus: 'pending' | 'fulfilled' | 'rejected';
}, never>

type STATE = RX_STATE_TYPE<ROOM_STATE_TYPE>


const cb = (state: RX_STATE_TYPE<ROOM_STATE_TYPE>, action: ACTION) => {

    if (action?.meta.requestStatus === 'pending') {
        state.loading = true
    }

    if (action?.meta.requestStatus === 'fulfilled') {
        state.loading = false
        state.data.doc = action.payload
    }

    if (action?.meta.requestStatus === 'fulfilled') {
        state.loading = false
        // state.error = action?.error.message
    }


}


const buildCases = (builder: ActionReducerMapBuilder<RX_STATE_TYPE<ROOM_TYPE>>) => {

    for (let f of Object.entries(RoomThunkFunctions)) {
        if (f) {
            for (let s of f) {
                if (s) {
                    let zero = t(s, 0)
                    let one = t(s, 1)
                    let two = t(s, 2)
                    let three = t(s, 3)
                    builder.addCase(zero, (state) => {
                        state.loading = true
                    })
                        .addCase(one, (state, action) => {
                            state.loading = false
                            if (three === 'array') {
                                state.data.List = action.payload
                            } else {
                                state.data.doc = action.payload
                            }
                        })
                        .addCase(two, (state, action) => {
                            state.loading = false
                            state.error = action.error.message
                        })
                }

            }
        }
    }
}
const buildAddCase = (builder: ActionReducerMapBuilder<RX_STATE_TYPE<ROOM_TYPE>>) => {

    for (let f of Object.entries(RoomThunkFunctions)) {

        console.log("builder e f:", f)


        // eslint-disable-next-line array-callback-return
        const result = f.map((m) => {
            if (m) {
                builder.addCase(t(m, 0), (state) => {
                    state.loading = true
                })
                    .addCase(t(m, 1), (state, action) => {
                        state.loading = false
                        console.log("builder: ", typeof action)
                        if (action.payload.length > 0) {
                            state.data.List = action.payload
                        } else {
                            state.data.doc = action.payload
                        }
                    })
                    .addCase(t(m, 2), (state, action) => {
                        state.loading = false
                        state.error = action.error.message
                    })
            }

        })



    }

}

const t = (m: any, num: number) => {


    if (typeof m == 'function') {
        if (num === 0) {
            return m.pending
        }
        if (num === 1) {
            return m.fulfilled
        }
        if (num === 2) {
            return m.rejected
        }

    }


    if (num === 3 && typeof m === 'string') {
        if (m.includes('Rooms') || m.includes('All')) {
            return 'array'
        } else {
            return 'not-array'
        }
    }
}



const {
    setRoomsState,
    setRoomsByHotelIdState,
    setAvailableRoomsByHotelIdState,
    setCleanedRoomsByHotelIdState,
    setNotCleanedRoomsByHotelIdState,
    setBookedRoomsByHotelIdState,
    setSingleRoomsByHotelIdState,
    setDoubleRoomsByHotelIdState,
} = roomSlice.actions


export const RoomThunkFunctions = {

    fetchRoomById,
    createRoomByHotelId,
    updateRoomById,
    removeRoomById,
    fetchRoomsByHotel,
    fetchAllAvailableRooms,
    fetchAllBookedRooms,
    fetchAllCleanedRooms,
    fetchAllNotCleanedRooms,
    fetchAllSingleRooms,
    fetchAllDoubleRooms,
}
export const RoomActions = roomSlice.actions

export const roomReducer = roomSlice.reducer
