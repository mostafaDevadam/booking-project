import { AUTH_INPUT_TYPE } from "../../../../utils/types/auth.types"
import { callAPI } from "../../callAPI"

export const postSignUpUser = async (data: AUTH_INPUT_TYPE) => {
    const result = await callAPI('POST', 'auth/signup', data)
    return result.data
}
