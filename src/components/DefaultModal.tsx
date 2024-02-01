import React, { useState, useId } from 'react'
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { BOOKING_TYPE, ROOM_TYPE } from '../utils/types/types';
import { Type } from 'typescript';
import { KIND_OF_ROOM_ENUM } from '../utils/enums/enums';
import MessageModal from './MessageModal';
import { SubmitHandler, useForm } from 'react-hook-form';

type WCH<T = {}> = T & {
  show: boolean,
  handleShow: () => void,
  handleClose: () => void,
  children?: React.ReactNode
  isEdit?: boolean
  showMsgModal: boolean
}

type CP = WCH<{ data: Partial<ROOM_TYPE | BOOKING_TYPE> }>

type INPUTS = Partial<ROOM_TYPE>


type PROPS<T> = {
  data?: T
  show: boolean
  handleShow: () => void
  handleClose: () => void
  children?: React.ReactNode
  isEdit?: boolean
  showMsgModal: boolean,
  backRemoveValue?: (val: boolean) => void
  handleSubmit?: (el: ROOM_TYPE) => void

}

type t = ROOM_TYPE | BOOKING_TYPE


const DefaultModal: React.FC<PROPS<ROOM_TYPE>> = ({ data, show, handleShow, handleClose, children, backRemoveValue, handleSubmit }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const type_keys = Object.keys(KIND_OF_ROOM_ENUM)
  const [types, setTypes] = useState<any>(type_keys[0])
  const [selectedRoomType, setSelectedRoomType] = useState<KIND_OF_ROOM_ENUM>(KIND_OF_ROOM_ENUM.single)

  const [showMsgModal, setShowMsgModal] = useState<boolean>(false)

  const img = "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22858%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20858%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18d58e0461b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A43pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18d58e0461b%22%3E%3Crect%20width%3D%22858%22%20height%3D%22250%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22319.0124969482422%22%20y%3D%22144.2%22%3E858x250%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"

  const { register, handleSubmit: submitForm, watch, formState: { errors } } = useForm<INPUTS>()

  const displayEditForm = (e: any) => {
    setIsEdit((prev) => prev = !isEdit)
    return
  }

  const submit: SubmitHandler<INPUTS> = async (data$) => {
    //e.preventDefault()
    /* if (data) {
       handleSubmit && handleSubmit(data)
     }*/
     data$._id = data?._id
     data$.isBooked = data?.isBooked


     console.log(data$)
     handleSubmit && handleSubmit(data$)


  }

  //type T_ENUM_TYPE = {<T extends string, TEnum extends string | number>}

  function getEnumKeys<T extends string, TEnum extends string | number | any>
    (enumVariable: { [key in T]: TEnum }) {
    return Object.keys(enumVariable) as Array<T>
  }

  enum ST {
    first = "F",
    second = "S"
  }
  const lbls: { [key in KIND_OF_ROOM_ENUM]: KIND_OF_ROOM_ENUM } = {
    single: KIND_OF_ROOM_ENUM.single,
    double: KIND_OF_ROOM_ENUM.double,

  }

  const getRoomType = (t: KIND_OF_ROOM_ENUM) => lbls[t]

  const handleRoomTypeChanged = (e: any) => {

    const v = getRoomType(e.target.value)
    setSelectedRoomType(v)
    console.log(selectedRoomType, v)
  }

  const handleCloseMsgModal = () => setShowMsgModal(false);
  const handleShowMsgModal = () => setShowMsgModal(true);

  const openMsgModal = (e: any) => {
    //setSelectedRoom(el)
    handleShowMsgModal()
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
  </Button>*/}

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
          <Image src={img} fluid />
          <div>
            <p>Woohoo, you are reading this text in a modal!</p>
            {data &&
              (
                <>
                  {!isEdit ?
                    <div>
                      <p>room info</p>
                      <p>Room Number: {data?.room_number && data?.room_number}</p>
                      <p>Room Type: {data?.room_type} icon</p>
                      <p>Price: {data?.price ? data?.price : 56} € icon</p>
                      <p>Phone: {data?.phone_number ? data?.phone_number : 85625789} icon</p>
                      <p>Cleaned: {data?.isCleaned ? 'T' : 'F'} icon</p>
                      <p>Cleaned Date: {data?.cleaned_date && data?.cleaned_date} icon</p>
                      <p>Booked: {data?.isBooked ? 'T' : 'F'} icon</p>
                      {data?.isBooked &&
                        <>
                          <p>Booking info</p>
                          <p>Start: date</p>
                          <p>End: date</p>
                          <p>checked-in : yes icon</p>
                          <p>checked-in at: date icon</p>
                          <p>checked-out : no icon</p>
                          <p>checked-out at: date icon</p>
                          <p>confirmed: yes icon</p>
                          <p>confirmed at: date</p>
                          <p>paid at: date</p>
                          <p>paid : 210 €</p>
                        </>
                      }
                    </div> :
                    <div>
                      <h2>Edit Room Form</h2>

                      <div>
                        <p>Room Number: {data?.room_number && data?.room_number}</p>

                        <Form onSubmit={submitForm(submit)}>
                          <Form.Group className="mb-3" controlId="room_type">
                            <Form.Label>Room Type</Form.Label>
                            <Form.Select {...register("room_type")} onChange={handleRoomTypeChanged} defaultValue={data?.room_type}>
                              <option>Open this select menu</option>
                              {type_keys.map((k, i) =>
                              (
                                <option key={i} value={k}>{k}</option>
                              ))}

                            </Form.Select>
                            <Form.Text className="text-muted">
                              Choose the room type.
                            </Form.Text>
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control {...register("price")}  type="text" placeholder="Price" defaultValue={data?.price ? data?.price : '00'} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control {...register("phone_number")}  type="tel" placeholder="Phone" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="cleaned_at">
                            <Form.Label>Cleaned at</Form.Label>
                            <Form.Control {...register("cleaned_date")} type="date" placeholder="" />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="cleaned">
                            <Form.Check {...register("isCleaned")} type="checkbox" label={data?.isCleaned ? "Cleaned" : "Not Cleaned"} defaultChecked={data?.isCleaned} />
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="booked" >
                            <Form.Check {...register("isBooked", data?.isBooked)} readOnly={true} disabled type="checkbox" label={data?.isBooked ? "Booked" : "Not Booked"} defaultChecked={data?.isBooked} />
                          </Form.Group>


                          <Button variant="primary" type="submit">
                            Submit
                          </Button>
                        </Form>

                      </div>

                    </div>
                  }



                </>
              )
            }

          </div>




        </Modal.Body>
        <Modal.Footer className='d-flex flex-row justify-content-between'>
          <div>
            {data &&
              <div className='d-flex flex-row gap-2 mt-2'>
                {/*<Button size="sm">get </Button>*/}
                <Button size="sm" onClick={displayEditForm}>update </Button>
                <Button size="sm" onClick={openMsgModal}>remove</Button>
                {/*<Button size="sm" variant="secondary"
                  disabled={!!data?.isBooked}
                >Book</Button>*/} {/* display form : new guest info, new booking info , submit */}
              </div>
            }
          </div>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          { /*<Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>*/}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DefaultModal
