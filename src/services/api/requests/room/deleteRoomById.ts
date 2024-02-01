import { callAPI } from "../../callAPI"


export const deleteRoomById = async (_id: any) => {
    const result = await callAPI('DELETE', 'room/'+_id)
    return result.data
}
