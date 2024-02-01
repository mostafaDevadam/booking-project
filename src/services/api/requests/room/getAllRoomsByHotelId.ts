import { callAPI } from "../../callAPI"


export const getAllRoomsByHotelId = async (hotel_id: any) => {
    const result = await callAPI('GET', 'room/all/hotel/'+hotel_id)
    return result.data
}
