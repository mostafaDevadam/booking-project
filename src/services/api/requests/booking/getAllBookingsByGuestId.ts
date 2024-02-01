import { callAPI } from "../../callAPI"


export const getAllBookingsByGuestId = async (guest_id: any) => {
    const result = await callAPI('GET', `booking/all/guest/${guest_id}`)
    return result.data
}
