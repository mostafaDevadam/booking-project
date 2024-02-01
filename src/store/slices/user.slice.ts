import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../utils/interfaces/interfaces";
import { RootState } from "../store.index";



const initialState: IUser = {
    data: {},
    loading: false,
    error: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState, //{data: null, loading: false, error: null},
    reducers: {
        setUserState: (state, action) => { state.data = action.payload },
        getUser: (state) => { },
        updateUser: (state) => { },
        setRoleInState: (state, action) => { state.data.role = action.payload.role},
        setAuth: (state) => { },
        getAuth: (state) => { },
    },
    /*extraReducers: (builder) => {
        builder
            .addCase('', (state) => { })
            .addCase('', (state, action) => { })
            .addCase('', (state, action) => { })
    },*/
})


export const {setRoleInState, setUserState} = userSlice.actions
//export const selectRole = (state: RootState) => state.user.data.role
export const userReducer = userSlice.reducer
