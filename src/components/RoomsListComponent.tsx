import React from 'react'
import { ROOM_TYPE } from '../utils/types/types'
import RoomComponent from './RoomComponent'


type PROPS<T> = {
    rooms?: T[]
    room?: T,
    //children?: any,
    fetchRoom: (e: any, _id: any) => {}
    updateRoom: (e: any, room: T) => {}
    removeRoom: (e: any, _id: any) => {}
    bookRoom: (e: any, room: T) => {}
    openModal: (e: any, room: T) => void
 

}



const RoomsListComponent: React.FC<PROPS<ROOM_TYPE>> = ({
    rooms, openModal,
     fetchRoom, updateRoom, removeRoom, bookRoom }) => (
    <>
        {rooms && rooms?.map((b: ROOM_TYPE) => (
            <RoomComponent openModal={openModal} room={b} fetchRoom={fetchRoom} updateRoom={updateRoom}
                removeRoom={removeRoom} bookRoom={bookRoom} />
        ))}
    </>

)

export default RoomsListComponent
