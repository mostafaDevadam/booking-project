import { postSignUpUser } from './postSignUpUser';
import { postSignInUser } from './postSignInUser';
import { callAPI } from '../../callAPI';
import { HotelService } from './hotel/hotel.service';
import { GuestService } from './guest/guest.service';




const startuserAPI = async () => {
    const result = await callAPI('GET', 'hotel')
    console.log("user api: ", result.data)
    const result2 = await callAPI('GET', 'guest')
    console.log("user api: ", result2.data)
    return result.data
}

const getUser = async (role: any, _id: any) => {
    if(role == 'hotel'){
       return await HotelService.getHotelById(_id)
    }else if (role == 'guest'){
        return await GuestService.getGuestById(_id)
    }

}

export const UserService = {postSignInUser, postSignUpUser, startuserAPI, getUser}


