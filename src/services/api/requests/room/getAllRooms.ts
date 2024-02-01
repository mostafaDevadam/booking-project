import { callAPI } from "../../callAPI"


export const getAllRooms = async () => {
    const result = await callAPI('GET', 'room/all')
    return result.data
}
