import { callAPI } from "../../../callAPI"


export const getAllGuestsByHotelId = async (hotel_id: any) => {
    const result = await callAPI('GET', `guest/all/hotel/${hotel_id}`)
    return result.data
}
