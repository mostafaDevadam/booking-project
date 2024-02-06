import { FormControl, FormGroup } from "@angular/forms"
import { GENDER_ENUM, KIND_OF_ROOM_ENUM, ROLE_ENUM } from "./enums"


export type AUTH_INPUTS_TYPE = {
  role: ROLE_ENUM
  email: string
  password: string
}


export type AUTH_FORM_TYPE = {
   //role?: FormControl<ROLE_ENUM>,
   email: FormControl<string>,
   password: FormControl<string>

}


export type BOOKING_TYPE = {
  _id?: any,
  nights?: any
  start_date?: string
  end_date?: string
  checkedIn_date?: string
  checkedOut_date?: string
  paid_date?: string
  isPaid?: boolean
  isCheckedIn?: boolean
  isCheckedOut?: boolean
  isConfirmed?: boolean
  confirmed_date?: string
  total_price?: any
  // ref
  hotel?: any,
  room?: any | ROOM_TYPE,
  guest?: any,
  createdAT?: any,
  updatedAt?: any,
}

export type ROOM_TYPE = {
  _id?: any,
  room_number?: any,
  size?: any
  isBooked?: any
  room_type?: KIND_OF_ROOM_ENUM //| string
  isCleaned?: any
  cleaned_date?: any
  phone_number?: any
  price?: any
  // ref
  hotel?: any,
  createdAT?: any
  updatedAt?: any
}

export type HOTEL_TYPE = {
  _id?: any,
  name?: any,
  email?: any,
  password?: any,
  count_rooms?: any
  count_stocks?: any
  description?: any
  createdAT?: any
  updatedAt?: any
}

export type GUEST_TYPE = {
  _id?: any,
  name?: any,
  email?: any,
  password?: any,
  birth_date?: any,
  gender?: GENDER_ENUM
  address?: any
  amount?: any
  createdAT?: any
  updatedAt?: any
 
}
