import { callAPI } from "../../callAPI"



export const getAllBookedRooms = async () => {
// 'all/booked'
const result = await callAPI('GET', `room/all/booked`)
return result.data
}
