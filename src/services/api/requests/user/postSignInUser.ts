import { AUTH_INPUT_TYPE } from "../../../../utils/types/auth.types"
import { callAPI } from "../../callAPI"


export const postSignInUser = async (data: AUTH_INPUT_TYPE) => {
    const result = await callAPI('POST', 'auth/signin', data)
    return result.data
}
