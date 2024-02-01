import React, { useState } from 'react'
import { ROOM_TYPE } from '../utils/types/types'
import { Button } from 'react-bootstrap'


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


const RoomComponent: React.FC<PROPS<ROOM_TYPE>> = ({
  room, openModal,
  fetchRoom, updateRoom, removeRoom, bookRoom }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [showMsgModal, setShowMsgModal] = useState<boolean>(false)


  const displayBtns = (e: any, el: ROOM_TYPE, action: 'hover' | 'leave' | null) => {
    /*if (_id) {
      if (action === 'hover') {
        setIsClicked(true)
      }

      if (action === 'leave') {
        setIsClicked(false)
      }

      if (action === null) {
        setIsClicked(prev => prev = !isClicked)
      }
    }*/

    if (el._id) {
      openModal(e, el)
    }



  }



  return (
    <>



      {room &&

        <div key={room?._id} className='mt-3  p-3'>
          <div className={room.isBooked ? "bg-danger p-4" : "bg-light p-4"}
            /* onMouseOver={(e) => displayBtns(e, room._id, 'hover')}
             onMouseLeave={(e) => displayBtns(e, room._id, 'leave')}*/
            onClick={(e) => openModal(e, room)}

          >
            <p>{room.room_number}</p>
          </div>

          {isClicked && <div className='d-flex flex-row gap-2 mt-2'>
            <Button onClick={(e: any) => fetchRoom(e, room._id)} size="sm">get </Button>
            <Button onClick={(e: any) => updateRoom(e, room)} size="sm">update </Button>
            <Button onClick={(e: any) => removeRoom(e, room._id)} size="sm">remove</Button>
            <Button size="sm" variant="light"
              disabled={!!room.isBooked}

              onClick={(e: any) => bookRoom(e, room)}>Book</Button> {/* display form : new guest info, new booking info , submit */}
          </div>}
          <br />
        </div>
      }
    </>

  )
}


export default RoomComponent
