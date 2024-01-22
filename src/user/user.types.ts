
export type USER_TYPE = {
    email: string
    password: string
}

export type BASE_USER_TYPE = {
   USER_TYPE,
   birth_date: string,
}

export type BASE_USER_INPUTS_TYPE = {
    USER_TYPE,

}
