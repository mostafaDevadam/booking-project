import { callAPI } from "../../callAPI"



export const getBookingById = async(_id: any) => {
    const result = await callAPI('GET', `booking/${_id}`)
    console.log("one booking:",result.data)
    return result.data
}
