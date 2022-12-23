import * as api from '../api'

import {createAsyncThunk} from "@reduxjs/toolkit";

export const updateAvatar = createAsyncThunk('user/update', async ({navigate, _id, formData}) => {

    const {data} = await api.updateAvatar(_id, formData)

    navigate(`/profile/${_id}`, {replace: true})
    return data

})
export const getUserData = createAsyncThunk('user/get', async () => {
    const {data} = await api.getUserData()
    return data


})
export const followUser = createAsyncThunk('user/follow', async (followUserId) => {
    const {data} = await api.followUser(followUserId)


    return data


})