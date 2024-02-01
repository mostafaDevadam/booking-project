
import { callAPI } from "../../callAPI"


export const getAllSingleRooms = async () => {
// 'all/single'
 const result = await callAPI('GET', `room/all/single`)
    return result.data
}
