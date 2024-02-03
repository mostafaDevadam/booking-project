import { GUEST_TYPE } from "../../../../../utils/types/types"
import { callAPI } from "../../../callAPI"


export const postCreateGuest = async (hotel_id: any, data: GUEST_TYPE) => {
    const result = await callAPI('POST', 'guest/create/hotel/'+hotel_id, data)
    return result.data
}
