import { ROLE_USER_ENUM } from "../enums/enums"


export type AUTH_INPUT_TYPE = {
    role: ROLE_USER_ENUM | null,//'hotel' | 'guest'
    email: string
    password: string
}


export type AUTH_SIGNUP_TYPE = {

}

export type AUTH_SIGNIN_TYPE = {

}
