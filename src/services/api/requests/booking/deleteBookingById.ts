import { callAPI } from "../../callAPI"


export const deleteBookingById = async(booking_id: any, room_id: any) => {
    const result = await callAPI('DELETE', `booking/${booking_id}/room/${room_id}`)
    return result.data
}
