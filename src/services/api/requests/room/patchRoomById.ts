import { ROOM_STATE_TYPE } from "../../../../utils/types/redux.types";
import { callAPI } from "../../callAPI";


export const patchRoomById = async (_id: any, data: ROOM_STATE_TYPE) => {
    const result = await callAPI('PATCH', 'room/'+_id, data)
    return result.data
}
