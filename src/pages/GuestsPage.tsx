import React, { useEffect, useState } from 'react'
import { useAppDisptach, useAppSelector } from '../hooks/useRedux'
import { GuestThunkFunctions } from '../store/slices/guest/guest.thunks'
import { GUEST_TYPE } from '../utils/types/types'

const GuestsPage = () => {
  const dispatch = useAppDisptach()

  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)

  const guestSelector = useAppSelector((state) => state.guest)

  const [guests, setGuests] = useState<GUEST_TYPE[]>()

  useEffect(() => {
    if (hotelSelector._id) {
      dispatch(GuestThunkFunctions.fetchAllGuestsByHotelId(hotelSelector._id))
      console.log("guests:", guestSelector.data.List)
      setGuests(guestSelector.data.List)
    }
  }, [guests])


  return (
    <div>GuestsPage

      <div>

        {guestSelector.loading && "loading..."}

        {!guestSelector.loading && guests && guests.map((m) => (<div key={m._id}>{m.name} - {m.email}</div>))
        }

      </div>


    </div>
  )
}

export default GuestsPage
