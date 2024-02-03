import { enum_gender } from "./guest"

export type GUEST_INPUT_TYPE = {
    email: string
    password: string
}

export type GUEST_INPUTS_TYPE = {
    name?: string
    email: string
    password?: string
    gender?: enum_gender
    birth_date?: string
    phone_number?: string
    hotel?: any
}
