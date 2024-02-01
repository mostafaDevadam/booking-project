import { AUTH_INPUT_TYPE } from '../utils/types/auth.types';
import { UserService } from './api/requests/user/user.service';
import { StorageService } from './storage.service';






const authSignIn = async (data: AUTH_INPUT_TYPE) => {
    const result = await UserService.postSignInUser(data)
    return result
}

const authSignUp = async (data: AUTH_INPUT_TYPE) => {
    const result = await UserService.postSignUpUser(data)
    return result
}

const getToken = async () =>  await StorageService.getItem('TOKEN')








export const AuthService = {
    authSignIn,
    authSignUp,
    getToken,
}
