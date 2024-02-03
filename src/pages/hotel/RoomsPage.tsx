import React, { useEffect, useState, } from 'react'
import { useAppDisptach, useAppSelector } from '../../hooks/useRedux'
import { RoomService } from '../../services/api/requests/room/room.service'
import { RoomActions, RoomThunkFunctions } from '../../store/slices/room.slice';
import { Button } from 'react-bootstrap';
import { ROOM_STATE_TYPE } from '../../utils/types/redux.types';
import { KIND_OF_ROOM_ENUM } from '../../utils/enums/enums';
import { BOOKING_TYPE, ROOM_TYPE } from '../../utils/types/types';
import DefaultModal from '../../components/DefaultModal';
import { room_types } from '../../utils/types/room.types';
import RoomsListComponent from '../../components/RoomsListComponent';
import MessageModal from '../../components/MessageModal';

const RoomsPage = () => {

  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)
  const dispatch = useAppDisptach()
  const roomsSelector = useAppSelector((state) => state.room.data)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showMsgModal, setShowMsgModal] = useState<boolean>(false)

  const [selectedRoom, setSelectedRoom] = useState<ROOM_TYPE>({})



  useEffect(() => {
    console.log("rooms selector list by hotel :", roomsSelector.List)

    //console.log("rooms selector list by hotel :", roomsSelector.List.filter((fl, arr, index) => fl._id === '65b049153a7da1f922eaebfb')[0])

  }, [roomsSelector.List])


  useEffect(() => {

    fetchAllRoomsByHotel()

  }, [hotelSelector._id])

  const fetchAllRoomsByHotel = async () => {
    //const docs = await RoomService.getAllRoomsByHotelId(hotelSelector._id)
    //console.log("rooms by hotel:", docs)
    await dispatch(RoomThunkFunctions.fetchRoomsByHotel(hotelSelector._id)).unwrap()
    //dispatch(RoomActions.setRoomsState(docs))
  }

  const fetchRoom = async (e: any, _id: any) => {
    await dispatch(RoomThunkFunctions.fetchRoomById(_id))
    console.log("fetch room by id :", roomsSelector.doc)
  }

  const updateRoom = async (e: any, el: ROOM_TYPE) => {
    const data: ROOM_TYPE = {
      _id: el._id,
      isBooked: false,
      price: 65,
    }
    await dispatch(RoomThunkFunctions.updateRoomById(data))
    console.log("updated room by id :", roomsSelector.doc)
  }

  const removeRoom = async (e: any, _id: any) => {
    //await dispatch(RoomThunkFunctions.removeRoomById(_id))
    //console.log("removed room by id :", roomsSelector.doc)
    // openRemoveModal(e)
    handleShowMsgModal()
  }

  const createRoom = async (e: any) => {
    if (hotelSelector._id) {
      const data: ROOM_TYPE = {
        room_number: '015',
        price: 73,
        hotel: hotelSelector._id,
        room_type: KIND_OF_ROOM_ENUM.single,
      }
      await dispatch(RoomThunkFunctions.createRoomByHotelId(data))
      console.log("created room by hotel_id :", roomsSelector.doc)
    } else {
      console.log("can't create a new room ")
    }
  }

  const bookRoom = async (e: any, el: ROOM_TYPE) => {
    console.log("book room:", el)

  }

  const displayBtns = (e: any, _id: any) => {
    if (_id) {
      setIsClicked(prev => prev = !isClicked)
    }

  }

  // display modal : image, room_number, room_type, phone , buttons...

  const openModal = (e: any, el: ROOM_TYPE) => {
    // alert("open modal " + el.room_number)
    dispatch(RoomActions.setRoomState(el))
    setSelectedRoom(el)
    handleShow()
  }


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // message Modal

  const handleCloseMsgModal = () => setShowMsgModal(false);
  const handleShowMsgModal = () => setShowMsgModal(true);

  const openMsgModal = (e: any) => {
    //setSelectedRoom(el)
    handleShowMsgModal()
  }

  const [isRemove, setIsRemove] = useState<boolean>(false)

  const backRemoveValue = async (val: boolean) => {
    if (val) {
      // remove
      console.log("isRemove:", val, selectedRoom)
      await dispatch(RoomThunkFunctions.removeRoomById(selectedRoom?._id))
      console.log("removed room by id :", roomsSelector.doc)
    }
  }

  const update = async (el: ROOM_TYPE) => {
      console.log("update: ", el)
      await dispatch(RoomThunkFunctions.updateRoomById(el))
      console.log("updated room by id :", roomsSelector.doc)
  }






  return (
    <div>RoomsPage

      <Button onClick={createRoom}>create room</Button>
      {/*<Button onClick={fetchRoom}>get room</Button>
      <Button onClick={updateRoom}>update room</Button>
  <Button onClick={removeRoom}>remove room</Button>*/}

      <DefaultModal
        data={selectedRoom}
        show={showModal}
        handleShow={handleShow}
        handleClose={handleClose}
        showMsgModal={showMsgModal}
        backRemoveValue={backRemoveValue}
        handleSubmit={update}
      >




      </DefaultModal>




      <div className='d-flex flex-row flex-row flex-wrap gap-3 p-3'>

        {roomsSelector.List &&
          <RoomsListComponent openModal={openModal} rooms={roomsSelector.List} fetchRoom={fetchRoom} updateRoom={updateRoom}
            removeRoom={removeRoom} bookRoom={bookRoom}
          />
        }


      </div>
      <br /><br />

    </div>
  )
}

export default RoomsPage


type WCH<T = {}> = T & { children?: React.ReactNode }

type CP = WCH<{ title: string, name: string, data: Partial<ROOM_TYPE | BOOKING_TYPE> }>

const RenderDiv: React.FC<CP> = ({ name, title, children, data }) => {
  return (<></>)
}
