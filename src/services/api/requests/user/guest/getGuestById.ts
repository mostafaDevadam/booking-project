import { callAPI } from "../../../callAPI"


export const getGuestById = async (_id: any) => {
    const result = await callAPI('GET', 'guest/'+_id)
    return result.data
}
