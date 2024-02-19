import React from 'react'
import { Container, Nav, NavItem, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store.index'
import { useAppDisptach, useAppSelector } from '../../hooks/useRedux'
import { useAuth } from '../../auth/useAuth'
import { ROLE_USER_ENUM } from '../../utils/enums/enums'
import { GuestThunkFunctions } from '../../store/slices/guest/guest.thunks'


const SideBarLeft = () => {
  const usr = useSelector((state: RootState) => state.user.data.role)
  const hotelState = useSelector((state: RootState) => state.hotel.data.doc) //useAppSelector((state) => state.hotel.data)
  const hotelSelector = useAppSelector((state) => state.hotel.data.doc)
  const { role } = useAuth()
  const guestSelector = useAppSelector((state) => state.guest)
  const dispatch = useAppDisptach()

  // click guests link
  // dispatch(GuestThunkFunctions.fetchAllGuestsByHotelId(hotelSelector._id))


  const fetchGuestsByHotel = () => {
    if (hotelSelector._id) {
      dispatch(GuestThunkFunctions.fetchAllGuestsByHotelId(hotelSelector._id))
      console.log("guests:", guestSelector.data.List)
    }
  }

  const fetchRoomsByHotel = () => {
    if (hotelSelector._id) {

    }

  }

  const fetchBookingsByHotel = () => {
    if (hotelSelector._id) {

    }

  }

  const linkToGuests = () => {
    fetchGuestsByHotel()
  }

  const linkToRooms = () => {
    fetchRoomsByHotel()
  }

  const linkToBookings = () => {
    fetchBookingsByHotel()
  }


  return (
    <div>
      <Nav className="text-light flex-column" >
        <Container className=''>
          <h2>Redux: {usr && usr}</h2>
          {(role === ROLE_USER_ENUM.hotel) &&
            <>
              <Nav.Link className='me-3 text-light' as={Link} to={'/'}>Dashboard</Nav.Link>
              <Nav.Link className='me-3 text-light' as={Link} to={'/rooms'}>rooms</Nav.Link>
              <Nav.Link className='me-3 text-light' as={Link} to={'/bookings'}>bookings</Nav.Link>
              <Nav.Link className='me-3 text-light' onClick={linkToGuests} as={Link} to={'/guests'}>guests</Nav.Link>
              <Nav.Link className='me-3 text-light' as={Link} to={'/rooms/new'}>new room </Nav.Link>
              <Nav.Link className='me-3 text-light' as={Link} to={'/bookings/new'}>new booking </Nav.Link>
            </>
          }

          {(role === ROLE_USER_ENUM.guest) &&
            <>
              <Nav.Link className='me-3 text-light' as={Link} to={'/guest'}>Home</Nav.Link>
              <Nav.Link className='me-3 text-light' as={Link} to={'/guest/my'}>MyBookings</Nav.Link>
            </>}

        </Container>
      </Nav>
    </div>
  )
}

export default SideBarLeft
