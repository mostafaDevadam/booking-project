import { callAPI } from "../../callAPI"



export const getAllAvailableRooms = async () => {
    const result = await callAPI('GET', `room/all/available`)
    console.log("getAllAvailableRooms: ", result)
    return result.data
}
