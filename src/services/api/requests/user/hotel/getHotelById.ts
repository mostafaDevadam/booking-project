import { callAPI } from "../../../callAPI"


export const getHotelById = async (_id: any) => {
    const result = await callAPI('GET', 'hotel/'+_id)
    return result.data
}
