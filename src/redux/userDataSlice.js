import {createSlice} from "@reduxjs/toolkit"
import * as userInfor from '../actions/userInfor'

export const userData = createSlice({
    name: 'userData',
    initialState: {
        status: 'idle',
        userData: {},
    },


    extraReducers: (builder) => {
        builder

            .addCase(userInfor.getUserData.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(userInfor.getUserData.fulfilled, (state, action) => {
                state.status = 'success'
                localStorage.setItem('userData', JSON.stringify(action.payload))
                state.userData = action.payload

            })


            .addCase(userInfor.updateAvatar.pending, (state, action) => {
                state.status = 'pending'


            })
            .addCase(userInfor.updateAvatar.fulfilled, (state, action) => {
                state.status = 'success'
                const result = JSON.parse(localStorage.getItem('profile'))

                localStorage.setItem('profile', JSON.stringify({...result, user: {...action.payload}}))
                state.userData = action.payload

            })

            .addCase(userInfor.followUser.pending, (state, action) => {
                state.status = 'pending'


            })
            .addCase(userInfor.followUser.fulfilled, (state, action) => {
                state.status = 'success'
                const result = JSON.parse(localStorage.getItem('profile'))

                localStorage.setItem('profile', JSON.stringify({...result, user: {...action.payload}}))
                state.userData = action.payload


            })


    }


})
