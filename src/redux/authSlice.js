import {createSlice} from "@reduxjs/toolkit"
import * as auth from '../actions/auth'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'idle',
        authData: {},
    },
    reducers: {
        auth: (state, action) => {
            localStorage.setItem('profile', JSON.stringify(action.payload));
            state.authData = action.payload
        },
        logOut: (state, action) => {
            localStorage.clear()
            state.authData = null

        }


    },


    extraReducers: (builder) => {
        builder
            .addCase(auth.signIn.pending, (state, action) => {
                state.status = 'pending'


            })
            .addCase(auth.signIn.fulfilled, (state, action) => {
                state.status = 'successful'
                localStorage.setItem('profile', JSON.stringify(action.payload))
                state.authData = action.payload


            })
            .addCase(auth.signUp.pending, (state, action) => {
                state.status = 'pending'


            })
            .addCase(auth.signUp.fulfilled, (state, action) => {
                state.status = 'successful'
                localStorage.setItem('profile', JSON.stringify(action.payload))
                state.authData = action.payload


            })


    }


})
