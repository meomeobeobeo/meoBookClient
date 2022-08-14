import React, { createContext, useEffect, useRef, useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Catsvg from './image/Catsvg'
import { Box, Stack, Typography } from '@mui/material'
import UserProfile from './components/UserProfile/UserProfile'
import StoriesDetailPage from './components/Stories/StoriesDetailPage'
import Message from './components/Message/Message'
import { io } from 'socket.io-client'


export const UserContext = createContext()






function App() {

  const [currentId, setCurrentId] = useState()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const socket = useRef()
//   useEffect(() => {
//     socket.current = io("ws://localhost:8900")
//     socket.current.on('welcome',data=>{
//       console.log(data)
//     })

//     socket.current.emit('addUser', user?.user?._id)
//         socket.current.on('getUsers', users => {
//             console.log(users)

//         })
    

// },[user])

  








  return (
    <UserContext.Provider value={user}  >
     
        <BrowserRouter>
          <NavBar currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser} />

          <Routes>
            <Route
              path='/'
              element={<Home currentId={currentId} setCurrentId={setCurrentId} user={user} />}
            />
            <Route
              path='/auth'
              element={<Auth currentId={currentId} setCurrentId={setCurrentId} />}


            />
            <Route
              path={`/profile/${user?.user?._id || 'undifine'}`}
              element={<Profile user={user} setUser={setUser} />}

            />
            <Route
              path={'/userProfile/:userId'}
              element={<UserProfile currentUser={user} />}
            />
            <Route
              path={'/message'}
              element={<Message user={user} />}
            />
            <Route
              path='/stories'
              element={<StoriesDetailPage />}


            />

          </Routes>
          <footer style={{ position: 'relative', bottom: '0', width: '100%', marginTop: '100px' }}>
            <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={4} >
              <Box sx={{ width: 24, height: 24, color: 'gray' }}>
                <Catsvg style={{ width: 24, height: 24 }} />
              </Box>
              <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
            </Stack>
          </footer>
        </BrowserRouter>
      
    </UserContext.Provider>


  );
}

 
export default App;
