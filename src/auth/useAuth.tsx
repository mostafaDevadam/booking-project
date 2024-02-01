import React, { createContext, useContext, useEffect, useState } from 'react'
import { AUTH_INPUT_TYPE } from '../utils/types/auth.types';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/api/requests/user/user.service';
import { ROLE_USER_ENUM } from '../utils/enums/enums';
import { useDispatch } from 'react-redux';
import { setUserState } from '../store/slices/user.slice';
import { setHotel } from '../store/slices/hotel.slice';

const DEFAULT_TOKEN = ""


const DEFAULT_USER = {

}

export type AUTH_CONTEXT_TYPE = {
  token: string
  isAuthenticated: boolean
  signIn: ({ role, email, password }: AUTH_INPUT_TYPE) => void
  signUp: ({ role, email, password }: AUTH_INPUT_TYPE) => void
  signOut: () => void
  user: {}
  role: ROLE_USER_ENUM | null,
  setRole: (val: ROLE_USER_ENUM | null) => void


}

export const DEFAULT_AUTH_CONTEXT: AUTH_CONTEXT_TYPE = {
  token: DEFAULT_TOKEN,
  isAuthenticated: false,
  signIn: ({ role, email, password }: AUTH_INPUT_TYPE) => { },
  signUp: ({ role, email, password }: AUTH_INPUT_TYPE) => { },
  signOut: () => { },
  user: DEFAULT_USER,
  role: null,
  setRole: (val) => { },
}

export const AuthContext = createContext(DEFAULT_AUTH_CONTEXT)

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<any>()
  const [current_user, setCurrentUser] = useState<any>()
  const [role, setRole] = useState<ROLE_USER_ENUM | null>(null)

  const dispatch = useDispatch()




  useEffect(() => {
    AuthService.getToken()
      .then((tk) => {
        if (tk) {
          setToken(tk)
          setIsAuthenticated(Boolean(tk))
        }
      })
  }, [token])


  useEffect(() => {
    StorageService.getItem("USER")
      .then(async (th) => {
        if (th) {
         // console.log("user: ", th)
          //setToken(tk)
          //setIsAuthenticated(Boolean(tk))
          await fetchUser(th.role, th._id)
        }
      })
  }, [user, current_user])


  useEffect(() => {
    if(role){
      console.log("role after header: ", role)
    }

    // if role is hotel
    //then fetch hotel by id from user storage
    //if role is guest
    // then fetch guest by id from user storage


  }, [role])

  const fetchUser = async (role_: any, _id: any) => {
    const result = await UserService.getUser(role_, _id)
    //console.log("fetch-user: ", result)
    setCurrentUser(result)
    // redux
    dispatch(setUserState({ role: role_, ...result }))
  }

  const signUp = async ({ role, email, password }: AUTH_INPUT_TYPE) => {
    const result = await AuthService.authSignUp({ role, email, password })
    if (result) {
      console.log("signUp auth: ", result)
    }
  }

  const signIn = async ({ role: role_, email, password }: AUTH_INPUT_TYPE) => {
    console.log("role before signIn: ", role)
    const result = await AuthService.authSignIn({ role, email, password })
    if (result) {
      console.log("signin auth: ", result.payload)
      setIsAuthenticated(true)
      setRole(role)
      setToken(result.payload.access_token)
      setUser(result.payload)
      StorageService.saveItem("USER", { ...result.payload, role: role })
      StorageService.saveItem("TOKEN", result.payload.access_token)
      if (role === ROLE_USER_ENUM.hotel) {
        dispatch(setHotel({ _id: result.payload._id, email: result.payload.email, name: result.payload.name }))
      }
    }
  }



  const signOut = () => {

    StorageService.removeItem('TOKEN')
    StorageService.removeItem('USER')
    setIsAuthenticated(false)
    setUser(null)
    setToken('')
    setRole(null)

  }

  const context = {
    token,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    user,
    role,
    setRole,
  }

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
