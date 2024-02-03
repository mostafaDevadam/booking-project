import React, { useState } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { BOOKING_TYPE, ROOM_TYPE } from '../utils/types/types';
import MessageModal from './MessageModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDisptach, useAppSelector } from '../hooks/useRedux';
import DialogModal from './DialogModal';
import { RoomActions, RoomThunkFunctions } from '../store/slices/room.slice';


type INPUTS = BOOKING_TYPE

type PROPS<T> = {
  data?: T
  show: boolean,
  handleShow: () => void,
  handleClose: () => void,
  children?: React.ReactNode
  isEdit?: boolean
  backRemoveValue?: (val: boolean) => void
  handleSubmit?: (el: T) => void
  changeRoomInBooking?: (new_room_id: any, booking_id: any) => void
}


const BookingModal: React.FC<PROPS<BOOKING_TYPE>> = ({ data, show, handleShow, handleClose,
  backRemoveValue, handleSubmit, changeRoomInBooking }) => {

  const bookingSelector = useAppSelector((state) => state.booking.data)
  const roomsSelector = useAppSelector((state) => state.room.data)

  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [showMsgModal, setShowMsgModal] = useState<boolean>(false)
  const [showDialogModal, setShowDialogModal] = useState<boolean>(false)
  const dispatch = useAppDisptach()


  const { register, handleSubmit: submitForm, watch, formState: { errors } } = useForm()

  const handleCloseMsgModal = () => setShowMsgModal(false);
  const handleShowMsgModal = () => setShowMsgModal(true);

  const openMsgModal = (e: any) => {
    //setSelectedRoom(el)
    handleShowMsgModal()
  }

  const displayEditForm = (e: any) => {
    setIsEdit((prev) => prev = !isEdit)
    return
  }

  const submit: SubmitHandler<INPUTS> = async (data$) => {
    data$._id = data?._id
    data$.room = data?.room


    console.log(data)
    handleSubmit && handleSubmit(data$)

  }

  const enterRoom = (el: ROOM_TYPE) => {
    const doc = data
    if (doc) {
      //doc.room._id = el?._id
      console.log("enterRoom: ", el._id, doc._id)
      const new_room_id = el._id
      const booking_id = doc._id
      changeRoomInBooking && changeRoomInBooking(el._id, data?._id)
    }
  }

  // dialog Modal

  const handleCloseDialogModal = () => setShowDialogModal(false);
  const handleShowDialogModal = () => setShowDialogModal(true);

  const openDialogModal = async (e: any) => {
    //setSelectedRoom(el)
    dispatch(RoomThunkFunctions.fetchAllAvailableRooms)
    console.log('available rooms* ', roomsSelector.List)

    handleShowDialogModal()
  }

  return (
    <>
      <div>BookingModal</div>
      {/* fetch available rooms and pass to the dialog */}
      {<DialogModal
        data={roomsSelector.List}
        show={showDialogModal}
        handleShow={handleShowDialogModal}
        handleClose={handleCloseDialogModal}
        enterRoom={enterRoom}

      />}


      {<MessageModal
        show={showMsgModal}
        handleShow={handleShowMsgModal}
        handleClose={handleCloseMsgModal}
        message={"Do you want remove it?"}
        backRemoveValue={backRemoveValue}
      />}


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isEdit ?

            <div>
              <p>Room: {bookingSelector.doc.room?.room_number}</p>
              <p>Booking info</p>
              <p>Nights: {bookingSelector.doc.nights}</p>
              <p>Start: {bookingSelector.doc.start_date} date</p>
              <p>End: {bookingSelector.doc.end_date}date</p>
              <p>checked-in : {bookingSelector.doc.isCheckedIn}yes icon</p>
              <p>checked-in at: {bookingSelector.doc.checkedIn_date}date icon</p>
              <p>checked-out : {bookingSelector.doc.isCheckedOut}no icon</p>
              <p>checked-out at: {bookingSelector.doc.checkedOut_date}date icon</p>
              <p>confirmed: {bookingSelector.doc.isConfirmed} icon</p>
              <p>confirmed at: {bookingSelector.doc.confirmed_date} date</p>
              <p>paid at: {bookingSelector.doc.paid_date} date</p>
              <p>paid : {bookingSelector.doc.isPaid}210 €</p>

            </div>
            :

            <div>
              <h2>Edit Booking Form</h2>

              <div>
                <p>Booking</p>

                <div>
                  <span>Room: {bookingSelector.doc.room?.room_number} {" "}</span> {/* display available rooms in Modal */}
                  <Button size={"sm"} onClick={openDialogModal}>Change room</Button>
                </div>

                <Form onSubmit={submitForm(submit)}>
                  <Form.Group className="mb-3" controlId="nights">
                    <Form.Label>Nights</Form.Label>
                    <Form.Control {...register("nights")} type="number" defaultValue={data?.nights} />
                    <Form.Text className="text-muted">
                      Enter your nights
                    </Form.Text>
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="start_date">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control {...register("start_date")} type="date" defaultValue={data?.start_date} />
                    <Form.Text className="text-muted">
                      Choose Start Date
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="end_date">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control {...register("end_date")} type="date" defaultValue={data?.end_date} />
                    <Form.Text className="text-muted">
                      Choose End Date
                    </Form.Text>
                  </Form.Group>



                  <Form.Group className="mb-3" controlId="checkedIn_date">
                    <Form.Label>CheckIn Date</Form.Label>
                    <Form.Control {...register("checkedIn_date")} type="date" defaultValue={data?.checkedIn_date} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="isCheckedIn" >
                    <Form.Check {...register("isCheckedIn")} type="checkbox" label={"CheckedIn"}
                      defaultChecked={data?.isCheckedIn ? data?.isCheckedIn : false}  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="checkedOut_date">
                    <Form.Label>CheckOut Date</Form.Label>
                    <Form.Control {...register("checkedOut_date")} type="date" defaultValue={data?.checkedOut_date} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="isCheckedOut" >
                    <Form.Check {...register("isCheckedOut")} type="checkbox" label={"CheckedOut"}
                      defaultChecked={data?.isCheckedOut ? data?.isCheckedOut : false}  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="isConfirmed">
                    <Form.Label>Confirmed Date</Form.Label>
                    <Form.Control {...register("confirmed_date")} type="date" defaultValue={data?.confirmed_date}
                     />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmed_date" >
                    <Form.Check {...register("isConfirmed")} type="checkbox" label={"Confirmed"}
                      defaultChecked={data?.isConfirmed ? data?.isConfirmed : false}  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="confirmed_date" >
                  <Form.Label>Paid Date</Form.Label>
                  <Form.Control {...register("paid_date")} type="date" defaultValue={data?.paid_date}
                     />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="isPaid" >
                    <Form.Check {...register("isPaid")} type="checkbox" label={"isPaid"}
                      defaultChecked={data?.isPaid} />
                  </Form.Group>






                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>

              </div>
            </div>
          }



        </Modal.Body>
        <Modal.Footer className='d-flex flex-row justify-content-between'>
          <div>
            {data &&
              <div className='d-flex flex-row gap-2 mt-2'>

                <Button size="sm" onClick={displayEditForm}>update </Button>
                <Button size="sm" onClick={openMsgModal}>remove</Button>

              </div>
            }
          </div>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default BookingModal
