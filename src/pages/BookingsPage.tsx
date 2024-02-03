import React, { SyntheticEvent, useEffect, useState, } from 'react'
import { useGetBookingsQuery } from '../store/slices/api.slice'
import { Button, Spinner } from 'react-bootstrap'
import { useAppDisptach, useAppSelector } from '../hooks/useRedux'
import { BOOKING_TYPE } from '../utils/types/types'
import { BookingThunkFunctions } from '../store/slices/booking/thunks/booking.thunks'
import BookingsListComponent from '../components/BookingsListComponent'
import BookingModal from '../components/BookingModal'
import { BookingActions } from '../store/slices/booking/booking.slice'
import { RoomThunkFunctions } from '../store/slices/room.slice'

const BookingsPage = () => {

  const { data: bookings, isLoading, isSuccess, isError, error } = useGetBookingsQuery(null, {})
  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)
  const roomsSelector = useAppSelector((state) => state.room.data)
  const bookingSelector = useAppSelector((state) => state.booking.data)

  const [isRemove, setIsRemove] = useState<boolean>(false)

  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showMsgModal, setShowMsgModal] = useState<boolean>(false)

  const [selectedBooking, setSelectedBooking] = useState<BOOKING_TYPE>({})

  const dispatch = useAppDisptach()


  const guestId_1 = '65afb60143cc1a5951c89578'
  const guestId_2 = '65afb62443cc1a5951c8957a'
  const guestId_3 = '65afb62e43cc1a5951c8957c'
  const guestId_4 = '65afb63a43cc1a5951c8957e'
  const guestId_5 = '65afd30bad006a844ebaac6b'

  const roomId_1 = '65b049683a7da1f922eaec03'
  const roomId_3 = '65b0494d3a7da1f922eaebff'
  const roomId_4 = '65b049633a7da1f922eaec01'
  const roomId_5 = '65b0496d3a7da1f922eaec05'
  const roomId_6 = '65b049733a7da1f922eaec07'


  useEffect(() => {

    fetchAllBookingsByHotel()

  }, [hotelSelector._id])

  const fetchAllBookingsByHotel = async () => {
    //const docs = await RoomService.getAllRoomsByHotelId(hotelSelector._id)
    //console.log("rooms by hotel:", docs)
    await dispatch(BookingThunkFunctions.fetchAllBookingsByHotelId(hotelSelector._id)).unwrap()
    //dispatch(RoomActions.setRoomsState(docs))
  }

  let content

  if (isLoading) {
    content = <Spinner title='loading...'></Spinner>
  } else if (isSuccess) {
    content = bookings?.map((b: any, i: any) => <div key={i}>{b._id} {b.nights}</div>)
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  const createBooking = async (event: SyntheticEvent<HTMLButtonElement>) => {
    // create new guest and pass guest_id to new_booking
    if (hotelSelector._id) {
      const data: BOOKING_TYPE = {
        hotel: hotelSelector._id,
        guest: guestId_5,
        room: roomId_6,

        nights: 2,
      }
      await dispatch(BookingThunkFunctions.createBooking(data))
      console.log("created booking :", bookingSelector)
    }


  }

  const fetchBooking = async (event: SyntheticEvent<HTMLButtonElement>, _id: any) => {
    console.log(_id)
    await dispatch(BookingThunkFunctions.fetchOneBookingById(_id))
    console.log("fetch booking :", bookingSelector.doc)
  }

  const updateBooking = async (event: SyntheticEvent<HTMLButtonElement>, el: BOOKING_TYPE) => {
    console.log(el._id)
    const data: BOOKING_TYPE = {
      _id: el._id,
      nights: 4,
      room: el.room,
    }
    await dispatch(BookingThunkFunctions.updateBookingById(data))
    console.log("updated booking :", bookingSelector)
  }

  const removeBooking = async (event: SyntheticEvent<HTMLButtonElement>, el: BOOKING_TYPE) => {
    console.log(el)
    await dispatch(
      BookingThunkFunctions.removeBookingsById({ booking_id: el._id, room_id: el.room }))
    console.log("removed booking :", bookingSelector)
  }






  const openModal = (e: any, el: BOOKING_TYPE) => {
    // alert("open modal " + el.room_number)
    //dispatch(BookingActions.setBookingState(el))
    // fetch booking with room relation
    dispatch(RoomThunkFunctions.fetchAllAvailableRooms())
    console.log('available rooms* ', roomsSelector.List)

    dispatch(BookingThunkFunctions.fetchOneBookingById(el._id))
    console.log('booking* ', bookingSelector.doc)
    setSelectedBooking(el)
    handleShow()
  }


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);



  const backRemoveValue = async (val: boolean) => {
    if (val && selectedBooking && selectedBooking?.room) {
      // remove
      console.log("isRemove:", val, selectedBooking?.room)
      if(selectedBooking?.room?._id){
        await dispatch(BookingThunkFunctions.removeBookingsById({booking_id: selectedBooking?._id,
          room_id: selectedBooking?.room?._id }))
      }else if(selectedBooking?.room){
        await dispatch(BookingThunkFunctions.removeBookingsById({booking_id: selectedBooking?._id,
          room_id:  selectedBooking?.room }))
      }

      console.log("removed booking by id :", bookingSelector.doc)
    }
  }

  const update = async (el: BOOKING_TYPE) => {
    console.log("update: ", el)
    await dispatch(BookingThunkFunctions.updateBookingById(el))
    console.log("updated booking by id :", bookingSelector.doc)
  }

  const changeRoomInBooking = async (new_room_id: any, booking_id: any) => {
    console.log("change room in booking: ", new_room_id, booking_id)
    await dispatch(BookingThunkFunctions
      .changeRoomInBookingByIdAndRoomId({ booking_id, room_id: new_room_id }))
    console.log("changed room in booking :", bookingSelector.doc)

  }



  return (
    <div>

      <div>
        <h2>Bookings Page</h2>
        <Button onClick={createBooking}>create Booking</Button>
      </div>

      <div>
        <BookingModal
          data={selectedBooking}
          show={showModal}
          handleShow={handleShow}
          handleClose={handleClose}
          backRemoveValue={backRemoveValue}
          handleSubmit={update}
          changeRoomInBooking={changeRoomInBooking}

        />
      </div>

      <div className='d-flex flex-row flex-row flex-wrap gap-3 p-3'>
        {bookingSelector.List &&
          <BookingsListComponent bookings={bookingSelector.List} openModal={openModal} />
        }
      </div>



      {/*bookingSelector.List &&
        bookingSelector.List.map((b: any) => <div key={b._id}>
          {b._id} - {b.nights}
          <div>
            <Button onClick={(e: any) => fetchBooking(e, b._id)} size="sm">get Booking</Button>
            <Button onClick={(e: any) => updateBooking(e, b)} size="sm">update Booking</Button>
            <Button onClick={(e: any) => removeBooking(e, b)} size="sm">remove Booking</Button>
          </div>
          <br />

        </div>)*/}





    </div>
  )
}

export default BookingsPage
