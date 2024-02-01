import { callAPI } from "../../callAPI"



export const getAllNotCleanedRooms = async () => {
// 'all/not/cleaned'
 const result = await callAPI('GET', `room/all/not/cleaned`)
    return result.data
}
