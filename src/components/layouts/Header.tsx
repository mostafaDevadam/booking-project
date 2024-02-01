import React from 'react'
import { Container, Nav, NavItem, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'
import { ROLE_USER_ENUM } from '../../utils/enums/enums'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store.index'

const Header = () => {
  const { isAuthenticated, token, role, setRole, signOut, } = useAuth()
  const user = useSelector((state: RootState) => state.user.data)



  return (
    <div>
      {/*<Link to={'/'} >Dashboard</Link>
      <Link to={'/rooms'} >Rooms</Link>
      <Link to={'/bookings'} >Bookings</Link>
      <Link to={'/guests'} >Guests</Link>
      <Link to={'/rooms/new'} >New Room</Link>
  <Link to={'/bookings/new'} >New Booking</Link>*/}

      <Navbar bg="dark" className="text-light">
        <Container>
          <Navbar.Brand className="text-light"><Nav.Link as={Link} to={'/'}>Booking App</Nav.Link></Navbar.Brand>
          <Navbar.Toggle />
          {isAuthenticated && <Navbar.Collapse className="justify-content-start">
            <NavItem className='me-3' ><Nav.Link as={Link} to={'/rooms'}>Rooms</Nav.Link></NavItem>
            <NavItem className='me-3' ><Nav.Link as={Link} to={'/bookings'}>Bookings</Nav.Link></NavItem>
          </Navbar.Collapse>}

          {/* <Navbar.Collapse className="justify-content-center">
                  <NavItem className='me-3' ><Nav.Link as={Link} to={'/rooms'}>Rooms</Nav.Link></NavItem>
                  <NavItem className='me-3' ><Nav.Link as={Link} to={'/bookings'}>Bookings</Nav.Link></NavItem>
                </Navbar.Collapse>*/}


          {isAuthenticated && <Navbar.Collapse className="justify-content-end">
          <NavItem className='me-3' >{user.email}</NavItem>
            <NavItem className='me-3' onClick={signOut}>SignOut</NavItem>
          </Navbar.Collapse>}

          {!isAuthenticated && <Navbar.Collapse className="justify-content-end">
            {/*<NavItem className='me-3' ><Nav.Link as={Link} to={'/rooms'}>Rooms</Nav.Link></NavItem>
                  <NavItem className='me-3' ><Nav.Link as={Link} to={'/bookings'}>Bookings</Nav.Link></NavItem>
                  <NavItem className='me-3' ><Nav.Link as={Link} to={'/guests'}>Guests</Nav.Link></NavItem>
                  <NavItem className='me-3' ><Nav.Link as={Link} to={'/rooms/new'}>New Room</Nav.Link></NavItem>
              <NavItem className='me-3' ><Nav.Link as={Link} to={'/bookings/new'}>New Booking</Nav.Link></NavItem>*/}
            <NavItem className='me-3' onClick={(e) => setRole(ROLE_USER_ENUM.hotel)}><Nav.Link as={Link} to={'/login'}>Hotel</Nav.Link></NavItem>
            <NavItem className='me-3' onClick={(e) => setRole(ROLE_USER_ENUM.guest)}><Nav.Link as={Link} to={'/login'}>Guest</Nav.Link></NavItem>
            {/*<NavItem className='me-3' ><Nav.Link as={Link} to={'/login'}>Login</Nav.Link></NavItem>*/}
          </Navbar.Collapse>}
        </Container>
      </Navbar>

    </div>
  )
}

export default Header
