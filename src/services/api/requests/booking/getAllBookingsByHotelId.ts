import { callAPI } from "../../callAPI"


export const getAllBookingsByHotelId = async (hotel_id: any) => {
    const result = await callAPI('GET', `booking/all/hotel/${hotel_id}`)
    return result.data
}
