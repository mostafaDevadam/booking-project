import React from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { ROOM_TYPE } from '../utils/types/types';
import { useAppSelector } from '../hooks/useRedux';

type PROPS<T> = {
  data?: T[]
  show: boolean,
  handleShow: () => void,
  handleClose: () => void,
  enterRoom?: (el: ROOM_TYPE) => void,
  children?: React.ReactNode
}

const DialogModal: React.FC<PROPS<ROOM_TYPE>> = ({ data, show, handleClose, enterRoom }) => {

  //const roomsSelector = useAppSelector((state) => state.room.data)

  const handleClick = (e: any, el: ROOM_TYPE) => {
    console.log(e.target.value)
    enterRoom && enterRoom(el)
    handleClose()
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dialog Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <h2>Rooms grid</h2>
        <div className='d-flex flex-row flex-wrap gap-2 '>
          {data && data?.map((m) => (<div className='p-3 border' key={m._id}
          onClick={(e: any) => handleClick(e, m)}>{m.room_number} {m.isBooked ? 'booked' : 'free'}</div>))}
        </div>



      </Modal.Body>
      <Modal.Footer className='d-flex flex-row justify-content-between'>

      </Modal.Footer>
    </Modal>
  )
}

export default DialogModal
