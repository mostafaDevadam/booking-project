import { callAPI } from "../../callAPI"


export const getAllBookingsByRoomId = async (room_id: any) => {
    const result = await callAPI('GET', `booking/all/room/${room_id}`)
    return result.data
}
