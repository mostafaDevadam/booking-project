import { BOOKING_TYPE } from "../../../../utils/types/types";
import { callAPI } from "../../callAPI";




export const patchChangeRoomInBookingByBookingIdAndRoomId = async (booking_id: any,room_id: any) => {
    const result = await callAPI('PATCH', `booking/${booking_id}/change/room/${room_id}`)
    return result.data
}
