import { ROOM_STATE_TYPE } from "../../../../utils/types/redux.types"
import { callAPI } from "../../callAPI"

export const postCreateRoomByHotelId = async (hotel_id: any, data: ROOM_STATE_TYPE) => {
      // 'create/hotel/hotel_id'
      const result = await callAPI('POST', 'room/create/hotel/'+hotel_id, data)
      return result.data
}
