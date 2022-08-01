import {configureStore} from '@reduxjs/toolkit'
import {postsSlice} from './postSlice'
import {authSlice} from './authSlice'
import {userData} from './userDataSlice'

// import logger from 'redux-logger'   

const store = configureStore({
    reducer:{
        posts : postsSlice.reducer,
        auth : authSlice.reducer,
        userData : userData.reducer
      
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    

})

export default store