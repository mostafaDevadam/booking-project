import { BOOKING_TYPE } from "../../../../utils/types/types"
import { callAPI } from "../../callAPI"


export const postCreateBookingByHotelIdAndRoomIdAndGuestId = async (hotel_id: any, room_id: any, guest_id: any, data: BOOKING_TYPE) => {
    const result = await callAPI('POST', `booking/hotel/${hotel_id}/room/${room_id}/guest/${guest_id}`, data)
    return result.data
}
