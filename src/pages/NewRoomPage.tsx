import React, { useState, } from 'react'

import { useAppDisptach, useAppSelector } from '../hooks/useRedux';

import { RoomThunkFunctions } from '../store/slices/room.slice';

import { Button, Form, Image, Modal } from 'react-bootstrap';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ROOM_TYPE } from '../utils/types/types';
import { KIND_OF_ROOM_ENUM } from '../utils/enums/enums';


type INPUTS = ROOM_TYPE


const NewRoomPage = () => {

  const dispatch = useAppDisptach()

  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)

  const roomsSelector = useAppSelector((state) => state.room.data)

  const { register, handleSubmit, formState } = useForm()

  const type_keys = Object.keys(KIND_OF_ROOM_ENUM)
  const [types, setTypes] = useState<any>(type_keys[0])
  const [selectedRoomType, setSelectedRoomType] = useState<KIND_OF_ROOM_ENUM>(KIND_OF_ROOM_ENUM.single)


  const submit: SubmitHandler<INPUTS> = async (data$) => {
    data$.isBooked = false
    console.log("form :", data$)

    create(data$)

  }

  const create = async (data_: ROOM_TYPE) => {
    if (hotelSelector._id) {
      const data: ROOM_TYPE = {
        //room_number: '014',
        price: 73,
        hotel: hotelSelector._id,
        room_type: KIND_OF_ROOM_ENUM.single,
      }
      data_.hotel = hotelSelector._id
      data.room_type = selectedRoomType
      await dispatch(RoomThunkFunctions.createRoomByHotelId(data_))
      console.log("created room by hotel_id :", roomsSelector.doc)
    } else {
      console.log("can't create a new room ")
    }
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


  return (
    <div>

      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-3" controlId="room_type">
          <Form.Label>Room Type</Form.Label>
          <Form.Select {...register("room_type")} onChange={handleRoomTypeChanged}>
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
          <Form.Control {...register("price")} type="text" placeholder="Price" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control {...register("phone_number")} type="tel" placeholder="Phone" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cleaned_at">
          <Form.Label>Cleaned Date</Form.Label>
          <Form.Control {...register("cleaned_date")} disabled type="date" placeholder="" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="cleaned">
          <Form.Check {...register("isCleaned")} disabled type="checkbox" label="Cleaned" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="booked" >
          <Form.Check {...register("isBooked")} readOnly={true} disabled type="checkbox" label="Booked" defaultChecked={false}
            defaultValue={'false'}

          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>


    </div>
  )
}

export default NewRoomPage
