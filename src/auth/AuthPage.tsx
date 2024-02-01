import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { API_HOST } from '../constants';
import { UserService } from '../services/api/requests/user/user.service';
import { useAuth } from './useAuth';
import { AUTH_INPUT_TYPE } from '../utils/types/auth.types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store.index';
import { setRoleInState } from '../store/slices/user.slice';

const AuthPage = () => {

  const { signIn, signUp, role } = useAuth()

  const usr = useSelector((state: RootState) => state.user.data.role)

  const dispatch = useDispatch()

  const [state, setState] = useState<AUTH_INPUT_TYPE>(
    { role: role, email: '', password: '' }
  )

  const [isStart, setIsStart] = useState<boolean>(false)

  useEffect(() => {

  }, [])

  const fetchAPI = async () => {
    return
  }

  const handleSignIn = async (e: any) => {
    console.log("role before handleSignIn: ", role)
    const inputs = state
    await signIn({ role: inputs.role, email: inputs.email, password: inputs.password })
    //({ role: "hotel", email: "hotel1@gmx.de", password: "123123" })
    dispatch(setRoleInState({ role }))
  }

  const handleSignUp = async (e: any) => {
    const inputs = state
    await signUp({ role: inputs.role, email: inputs.email, password: inputs.password })
  }


  const handleChange = (e: any) => {
    e.preventDefault()
    console.log("handle change: ", e.target.id)
    setState((prev: any) => { return { ...prev, ...{ [e.target.id]: e.target.value } } })
    setIsStart(true)
    if (e.target.id == 'hotel' || e.target.id == 'guest') {
      // setIsStart(true)
    }/*else{
      setIsStart(false)
    }*/

    /*if(e.target.id == 'hotel'){
      e.target.style.color = "red"
    }

    if(e.target.id == 'guest'){
      e.target.style.color = "green"
    }*/
  }

  const handleChangeRole = (e: any) => {
    setState((prev: any) => { return { ...prev, ...{ role: e.target.id } } })
    setIsStart(true)
  }

  return (
    <div>
      <h2>AuthPage {role} </h2>

      {/* <div>
        <Button variant={'success'} id="hotel" name="hotel" onClick={handleChangeRole}>Hotel</Button>
        <Button variant={'info'} id="guest" name="guest" onClick={handleChangeRole}>Guest</Button>
      </div>*/}


      {role &&
        <>
          <div className='d-flex flex-column gap-3 p-3 w-25'>
            <input type="email" id="email" name="email" onChange={handleChange} />
            <input type="password" id="password" name="password" onChange={handleChange} />
          </div>

          <div>
            <Button variant='secondary' disabled={!isStart} onClick={handleSignIn}>SignIn</Button>
            <Button variant='success' disabled={!isStart} onClick={handleSignUp}>SignUp</Button>
          </div>
        </>
      }






    </div>
  )
}

export default AuthPage
