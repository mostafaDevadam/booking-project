import React from 'react'
import { Container, Nav, NavItem, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store/store.index'
import { useAppSelector } from '../../hooks/useRedux'


const SideBarLeft = () => {
  const usr = useSelector((state: RootState) => state.user.data.role)
  const hotelState = useSelector((state: RootState) => state.hotel.data.doc) //useAppSelector((state) => state.hotel.data)
 const hotelSelector = useAppSelector((state) => state.hotel.data.doc)


  return (
    <div>
      <Nav className="text-light flex-column" >
        <Container className=''>
          <h2>Redux: {usr && usr}</h2>
          <Nav.Link className='me-3 text-light' as={Link} to={'/'}>Dashboard</Nav.Link>
          <Nav.Link className='me-3 text-light' as={Link} to={'/rooms'}>rooms</Nav.Link>
          <Nav.Link className='me-3 text-light' as={Link} to={'/bookings'}>bookings</Nav.Link>
          <Nav.Link className='me-3 text-light' as={Link} to={'/guests'}>guests</Nav.Link>
          <Nav.Link className='me-3 text-light' as={Link} to={'/rooms/new'}>new room </Nav.Link>
          <Nav.Link className='me-3 text-light' as={Link} to={'/bookings/new'}>new booking </Nav.Link>
        </Container>
      </Nav>
    </div>
  )
}

export default SideBarLeft
