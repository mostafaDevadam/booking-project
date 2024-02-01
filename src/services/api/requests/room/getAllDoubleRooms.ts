import { callAPI } from "../../callAPI"



export const getAllDoubleRooms = async () => {
    // 'all/double'
    const result = await callAPI('GET', `room/all/double`)
    return result.data
}
