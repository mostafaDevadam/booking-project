import { Booking } from "../booking/booking"
import { Room } from "../room/room"
import { User } from "../users/user"
import { Specification_G } from "./abstracts"
import { eCOLOR, eROOM_SIZE, eUSER_ROLE } from "./enums"

// interfaces
export interface IBase_Mutation<T> {
    create(data: T): T | false
    update(_id: number, data: T): T | false
    remove(_id: number): any | false
}

export interface IBase_Query<T> {
    findOneById(_id: number): T
    findAll(): T[]
}

export interface IBase_Storage<T> {
    store(data: T): void
    getList(): any
}

export interface IBase_Manager<T> extends IBase_Mutation<T> { }


// interfaces Manager
export interface IRoom_Manager extends IBase_Manager<Room> {
    createRoom(hotel: User, price: string, room_number: string, room_color: eCOLOR, room_size: eROOM_SIZE): Room | false
}

export interface IUser_Manager extends IBase_Manager<User> {
    createUser(name: string, email: string, password: string, role: eUSER_ROLE): User
}
export interface IBooking_Manager extends IBase_Manager<Booking> {
    createBooking(nights: number, hotel: User, guest: User, room: Room): Booking | false
}


// interfaces Storage
export interface IStorage_Room extends IBase_Storage<Room>, IBase_Query<Room> { }
export interface IStorage_User extends IBase_Storage<User>, IBase_Query<User> { }
export interface IStorage_Booking extends IBase_Storage<Booking>, IBase_Query<Booking> { }

// interfaces filters
export interface IFilter<T, SP> {
    filter(cl: T[], specification: SP): T[]
}

export interface IFilter_User extends IFilter<User, Specification_G<User>> {
}


export interface IFilter_Room extends IFilter<Room, Specification_G<Room>> {
}


export interface IFilter_Booking extends IFilter<Booking, Specification_G<Booking>> {
}
