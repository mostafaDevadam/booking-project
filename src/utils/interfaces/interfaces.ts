export interface IBase_USER {
    _id?: any,
    name?: string
    email?: string,
    role?: string,

}
export interface IHotel extends IBase_USER {

}

export interface IGuest extends IBase_USER {

}

export interface IUser {
    data: IHotel | IGuest, // hotel | guest
    loading: boolean,
    error: any,
}
