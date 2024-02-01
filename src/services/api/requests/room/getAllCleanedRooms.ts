
import { callAPI } from "../../callAPI"


export const getAllCleanedRooms = async () => {
// 'all/cleaned'
const result = await callAPI('GET', `room/all/cleaned`)
return result.data
}
