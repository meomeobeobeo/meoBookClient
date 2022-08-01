import * as api from '../api/index'
import { createAsyncThunk } from "@reduxjs/toolkit";

export const signIn = createAsyncThunk('auth/signIn',async ({formData,navigate}) => {
   
    const {data} = await api.signIn(formData);
    navigate('/', { replace: true })
    return data




})
export const signUp = createAsyncThunk('auth/signUp',async ({formData , navigate} ) => {
    const {data} = await api.signUp(formData);
    navigate('/', { replace: true })
    return data

})
