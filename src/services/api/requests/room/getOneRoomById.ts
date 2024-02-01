import { callAPI } from "../../callAPI"



export const getOneRoomById = async (_id: any) => {
    const result = await callAPI('GET', 'room/'+_id)
    return result.data
}
