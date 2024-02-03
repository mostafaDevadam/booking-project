import { createAsyncThunk } from "@reduxjs/toolkit"
import { GUEST_TYPE } from "../../../utils/types/types"
import { GuestService } from "../../../services/api/requests/user/guest/guest.service"

const createGuestByHotelId = createAsyncThunk('guest/create',
    async ({ hotel_id, data }: { hotel_id: any, data: GUEST_TYPE }) => {
        return await GuestService.postCreateGuest(hotel_id, data)
        // get guestId and pass it to new booking
        // post new booking with hotel_id, room_id, new_guest_id
        
    }
)

const fetchAllGuestsByHotelId = createAsyncThunk('guest/all/hotel',
    async (hotel_id: any) => {
        return await GuestService.getAllGuestsByHotelId(hotel_id)
    }
)

const fetchGuestById = createAsyncThunk('guest/one',
    async (_id: any) => {
        return await GuestService.getGuestById(_id)
    }
)


export const GuestThunkFunctions = {
    createGuestByHotelId,
    fetchAllGuestsByHotelId,
    fetchGuestById,

}
