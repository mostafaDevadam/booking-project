import React, { useState, } from 'react'
import { useAppDisptach, useAppSelector } from '../hooks/useRedux';
import { RoomThunkFunctions } from '../store/slices/room.slice';
import DialogModal from '../components/DialogModal';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { BOOKING_TYPE, GUEST_TYPE, ROOM_TYPE } from '../utils/types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GuestThunkFunctions } from '../store/slices/guest/guest.thunks';
import { GENDER_ENUM } from '../utils/enums/enums';
import { BookingThunkFunctions } from '../store/slices/booking/thunks/booking.thunks';
import { GuestService } from '../services/api/requests/user/guest/guest.service';
import { BookingService } from '../services/api/requests/booking/booking.service';


type INPUTS_BOOKING = BOOKING_TYPE
type INPUTS_GUEST = GUEST_TYPE



// display available rooms is dropdown-list or in grid choose one for new _booking
const NewBookingPage = () => {

  const [showDialogModal, setShowDialogModal] = useState<boolean>(false)
  const dispatch = useAppDisptach()
  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)
  const bookingSelector = useAppSelector((state) => state.booking.data)
  const roomsSelector = useAppSelector((state) => state.room.data)
  const guestSelector = useAppSelector((state) => state.guest.data.doc)

  const [isNextForm, setIsNextForm] = useState<boolean>(false)

  const [newGuest, setNewGuest] = useState<GUEST_TYPE>({})
  const [room, setRoom] = useState<ROOM_TYPE>({})

  const type_keys = Object.keys(GENDER_ENUM)
  const [gender, setGender] = useState<any>(type_keys[0])
  const [selectedGender, setSelectedGender] = useState<GENDER_ENUM>(GENDER_ENUM.male)




  const { register, handleSubmit: submitForm, formState } = useForm()






  const submitGuest: SubmitHandler<INPUTS_GUEST> = async (data$) => {



    if (hotelSelector._id) {
      data$.gender = selectedGender
      /* await dispatch(GuestThunkFunctions.createGuestByHotelId({
         hotel_id: hotelSelector._id,
         data: data$
       }))*/
      const data: GUEST_TYPE = data$
      const guest = await GuestService.postCreateGuest(hotelSelector._id, data)
      if (guest) {
        setNewGuest(guest)
        console.log("created guest :", guest, newGuest)
        setIsNextForm(true)
      }
      //console.log("created guest :", guestSelector)
      //console.log("submitGuest :", data$)
    }
  }


  const submitBooking: SubmitHandler<INPUTS_BOOKING> = async (data$) => {
    //data$._id = data?._id
    // data$.room = data?.room
    console.log(data$, newGuest, room)
    //handleSubmit && handleSubmit(data$)
    if (hotelSelector._id && newGuest._id && room._id) {
      const data: BOOKING_TYPE = {
        ...data$,
        hotel: hotelSelector._id,
        guest: newGuest._id,
        room: room._id,
      }
      const new_booking = await BookingService.postCreateBookingByHotelIdAndRoomIdAndGuestId(hotelSelector._id,
        room._id, newGuest._id, data)
      if (new_booking) {
        console.log("new booking :", new_booking)
      }
      //  await dispatch(BookingThunkFunctions.createBooking(data))
      //console.log("created booking :", bookingSelector)
      //console.log("new booking :", data)

      //if (bookingSelector.doc) {
      //setIsNextForm(false)
      //}
    }
  }


  const handleCloseDialogModal = () => setShowDialogModal(false);
  const handleShowDialogModal = () => setShowDialogModal(true);

  const openDialogModal = async (e: any) => {
    //setSelectedRoom(el)
    dispatch(RoomThunkFunctions.fetchAllAvailableRooms)
    console.log('available rooms* ', roomsSelector.List)

    handleShowDialogModal()
  }

  const enterRoom = (el: ROOM_TYPE) => {
    console.log("choosed room: ", el)
    setRoom(el)
  }


  const lbls: { [key in GENDER_ENUM]: GENDER_ENUM } = {
    male: GENDER_ENUM.male,
    female: GENDER_ENUM.female,

  }

  const getGender = (t: GENDER_ENUM) => lbls[t]

  const handleGenderChanged = (e: any) => {
    const v = getGender(e.target.value)
    setSelectedGender(v)
    console.log(selectedGender, v)
  }



  return (
    <div>

      <div>
        {/* fetch available rooms and pass to the dialog */}
        {roomsSelector.List && <DialogModal
          data={roomsSelector.List}
          show={showDialogModal}
          handleShow={handleShowDialogModal}
          handleClose={handleCloseDialogModal}
          enterRoom={enterRoom}

        />}
      </div>

      <div>search for guest</div>

      <div>



        <div>
          <p>Booking</p>

          <div>form guest</div>

          {<div>
            <Form onSubmit={submitForm(submitGuest)}>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control {...register("name")} type="text" />
                <Form.Text className="text-muted">
                  Choose Start Date
                </Form.Text>
              </Form.Group>


              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control {...register("email")} type="text" />
                <Form.Text className="text-muted">
                  Choose Start Date
                </Form.Text>
              </Form.Group>





              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Birth date</Form.Label>
                <Form.Control {...register("birth_date")} type="date" />
                <Form.Text className="text-muted">
                  Choose Start Date
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select {...register("gender")} onChange={handleGenderChanged}>
                  <option>Open this select menu</option>
                  {type_keys.map((k, i) =>
                  (
                    <option key={i} value={k}>{k}</option>
                  ))}

                </Form.Select>

                <Form.Text className="text-muted">
                  Choose Start Date
                </Form.Text>
              </Form.Group>



              <Button variant="primary" type="submit">
                Create Guest
              </Button>

            </Form>
          </div>}


          <div>
            <span>Room: </span>
            <Button size={"sm"} onClick={openDialogModal}>Choose room</Button>
          </div>


          {isNextForm &&
            <>

              <div>Booking</div>



              <Form onSubmit={submitForm(submitBooking)}>

                <Form.Group className="mb-3" controlId="room">
                  <div>
                    <span>Room: </span>
                    <Button size={"sm"} onClick={openDialogModal}>Choose room</Button>
                  </div>
                </Form.Group>


                <Form.Group className="mb-3" controlId="nights">
                  <Form.Label>Nights</Form.Label>
                  <Form.Control {...register("nights")} type="number" />
                  <Form.Text className="text-muted">
                    Enter your nights
                  </Form.Text>
                </Form.Group>


                <Form.Group className="mb-3" controlId="start_date">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control {...register("start_date")} type="date" />
                  <Form.Text className="text-muted">
                    Choose Start Date
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="end_date">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control {...register("end_date")} type="date" />
                  <Form.Text className="text-muted">
                    Choose End Date
                  </Form.Text>
                </Form.Group>



                <Form.Group className="mb-3" controlId="checkedIn_date">
                  <Form.Label>CheckIn Date</Form.Label>
                  <Form.Control {...register("checkedIn_date")} type="date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="isCheckedIn" >
                  <Form.Check {...register("isCheckedIn")} type="checkbox" label={"CheckedIn"}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="checkedOut_date">
                  <Form.Label>CheckOut Date</Form.Label>
                  <Form.Control {...register("checkedOut_date")} type="date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="isCheckedOut" >
                  <Form.Check {...register("isCheckedOut")} type="checkbox" label={"CheckedOut"}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="isConfirmed">
                  <Form.Label>Confirmed Date</Form.Label>
                  <Form.Control {...register("confirmed_date")} type="date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmed_date" >
                  <Form.Check {...register("isConfirmed")} type="checkbox" label={"Confirmed"}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmed_date" >
                  <Form.Label>Paid Date</Form.Label>
                  <Form.Control {...register("paid_date")} type="date"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="isPaid" >
                  <Form.Check {...register("isPaid")} type="checkbox" label={"isPaid"}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </>}

        </div>



      </div>
    </div>
  )
}

export default NewBookingPage
