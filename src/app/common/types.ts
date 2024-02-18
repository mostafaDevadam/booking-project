import { FormControl, FormGroup } from "@angular/forms"
import { GENDER_ENUM, KIND_OF_ROOM_ENUM, ROLE_ENUM, ROLE_MODAL_UI_ENUM, SENDER_RECEIVER_ROLE, eAUTHOR_ROLE_ENUM } from "./enums"


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

export type CURRENT_USER = {

}

//export type USER =( HOTEL_TYPE & {role: ROLE_ENUM}) | (GUEST_TYPE & {role: ROLE_ENUM})

export type USER_TYPE_<H, G> = ((H | G) & { role: ROLE_ENUM })

export type USER_TYPE<T> = (T & { role?: ROLE_ENUM })







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
  address?: any
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

export type ION_USER_TYPE = {
  role?: ROLE_ENUM,
  _id?: any
  email?: string

}

export type FEEDBACK_TYPE = {
  _id?: any
  content?: string
  hotel?: any | HOTEL_TYPE
  guest?: any | GUEST_TYPE
  created_at?: any
  updated_at?: any
}

export type NOTE_TYPE = {
  _id?: any
  content?: string
  author_role?: eAUTHOR_ROLE_ENUM
  author?: any
  booking?: any

}

export type MESSAGE_INPUT_TYPE = {
  chat_id?: any
  sender_role?: SENDER_RECEIVER_ROLE
  receiver_role?: SENDER_RECEIVER_ROLE
  hotel?: string
  guest?: string
  message?: string
  sender?: any
  receiver?: any
}


export type MESSAGE_TYPE = {
  _id?: any
  sender_role?: SENDER_RECEIVER_ROLE
  receiver_role?: SENDER_RECEIVER_ROLE
  chat?: any
  message?: string
  sender?: any
  receiver?: any
  created_at?: any
  updated_at?: any

}


export type CHAT_TYPE = {
  _id?: any
  hotel?: any
  guest?: any
  tag?: any
  created_at?: any
  updated_at?: any
}
//
export type PROP_TYPE = {
  role: ROLE_MODAL_UI_ENUM
}
// Modal-UI
export type MODAL_UI_PROPS<T> = {
  //role: ROLE_MODAL_UI_ENUM
  //[k in keyof T]: T
  //[key: string]: T
  //[key: string]: T
}

export type MY_BOOKING_MODAL_PROPS<T> = {
  role: ROLE_MODAL_UI_ENUM
  booking?: T
}
/*

type M_TYPE = {
  [key: string]: string
}


type M_TYPE_<T> = {
  [key: string]: T
}

type M_TYPE_T <T> = {
  [k in keyof T]: T;
};

usage
 type L = {data: any, code: any}

   const booking_: L = {data: "", code: ""}


    const obj: M_TYPE_<typeof booking_> = {
      "booking": booking_
    }

    const obj2: M_TYPE_T<typeof booking_> = booking_


*/



//
export type ALERT_PROPS = {
  header: string
  subHeader: string
  message: string
}
