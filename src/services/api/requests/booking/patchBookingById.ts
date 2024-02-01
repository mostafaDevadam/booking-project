import { BOOKING_TYPE } from "../../../../utils/types/types";
import { callAPI } from "../../callAPI";



export const patchUpdateBookingById = async (_id: any, data: BOOKING_TYPE) => {
    const result = await callAPI('PATCH', `booking/${_id}`, data)
    return result.data
}
