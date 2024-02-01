import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import BookingsPage from '../pages/BookingsPage'
import RoomsPage from '../pages/RoomsPage'
import NewBookingPage from '../pages/NewBookingPage'
import NewRoomPage from '../pages/NewRoomPage'
import GuestsPage from '../pages/GuestsPage'
import AuthPage from '../auth/AuthPage'
import Main from '../components/layouts/Main'
import { useAuth } from '../auth/useAuth'
import { ROLE_USER_ENUM } from '../utils/enums/enums'
import RoomPage from '../pages/RoomPage'
import BookingPage from '../pages/BookingPage'

const ProtectedComponent = (element: JSX.Element): JSX.Element => {
  const { isAuthenticated, token, role } = useAuth()
  return (isAuthenticated || token) && (role === ROLE_USER_ENUM.hotel) ? element : <Navigate to={'/login'} replace />


}

const ProtectedChildComponent = (element: JSX.Element): JSX.Element => {
  const { isAuthenticated, token, role } = useAuth()
  return (isAuthenticated || token) && (role === ROLE_USER_ENUM.guest) ? element : <Navigate to={'/login'} replace />


}



const AppRouter = () => {
  const { isAuthenticated, token, role } = useAuth()

  /*  const old = () => (
      <Routes>
        <Route path='/' element={<Main children={<DashboardPage />} />}></Route>
        <Route path='/bookings' element={<Main children={<BookingsPage />} />}></Route>
        <Route path='/rooms' element={<Main children={<RoomsPage />} />}></Route>
        <Route path='/bookings/new' element={<Main children={<NewBookingPage />} />}></Route>
        <Route path='/rooms/new' element={<Main children={<NewRoomPage />} />}></Route>
        <Route path='/guests' element={<Main children={<GuestsPage />} />}></Route>

        <Route path='/login' element={<AuthPage />}></Route>
      </Routes>
    )*/
  return (
    <Routes>
      <Route path='/' element={ProtectedComponent(<Main />)}>
        <Route path='/' element={<DashboardPage />}></Route>
        <Route path='/guests' element={<GuestsPage />}></Route>
        <Route path='/bookings'>
          <Route path='/bookings' element={<BookingsPage />}></Route>
          <Route path='/bookings/new' element={<NewBookingPage />}></Route>
          <Route path='/bookings/:_id' element={<BookingPage />}></Route>
        </Route>

        <Route path='/rooms'>
          <Route path='/rooms' element={<RoomsPage />}></Route>
          <Route path='/rooms/new' element={<NewRoomPage />}></Route>
          <Route path='/rooms/:_id' element={<RoomPage />}></Route>
        </Route>
      </Route>

      {/*<Route path='/guest' element={ProtectedChildComponent(<Main />)}>

         <Route path='/guest/b' element={<BookingsPage />}></Route>
  </Route>*/}

      <Route path='/login' element={isAuthenticated ? <Navigate to={"/"} replace /> : <AuthPage />}></Route>

      <Route path='*' element={isAuthenticated ? <Navigate to={"/"} replace /> : <AuthPage />}></Route>




    </Routes>
  )
}

export default AppRouter
