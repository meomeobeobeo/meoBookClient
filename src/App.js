import React, {createContext, useEffect, useRef, useState} from 'react'
import NavBar from './components/NavBar/NavBar'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import UserProfile from './components/UserProfile/UserProfile'
import StoriesDetailPage from './components/Stories/StoriesDetailPage'
import Message from './components/Message/Message'
import {io} from 'socket.io-client'
import BottomNavigateion from './components/bottomNavagation/BottomNavigateion'
import SearchPage from './components/searchPage/SearchPage'


export const UserContext = createContext()


function App() {

    const [currentId, setCurrentId] = useState()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const socket = useRef()
    const [userStatus, setUserStatus] = useState([])


    useEffect(() => {

        socket.current = io("https://meobookmessagesocket.meoeco.click")


    }, [])
    useEffect(() => {
        if (user) {
            socket.current.emit('addActiveUser', user?.user?._id)
            socket.current.on('getActiveUser', activeUsers => {
                let process = []
                user?.user?.friendList.forEach(friendId => {


                    if (activeUsers?.find(data => data.userId === friendId)) {
                        process.push({
                            friendId: friendId,
                            status: 'active'
                        })

                    }


                })


                setUserStatus(process)

            })
        }


    }, [user])


    return (
        <UserContext.Provider value={{user, socket: socket, userStatus: userStatus}}>

            <BrowserRouter>
                <NavBar currentId={currentId} setCurrentId={setCurrentId} user={user} setUser={setUser}/>

                <Routes>
                    <Route
                        path='/'
                        element={<Home currentId={currentId} setCurrentId={setCurrentId} user={user}/>}
                    />
                    <Route
                        path='/auth'
                        element={<Auth currentId={currentId} setCurrentId={setCurrentId}/>}


                    />
                    <Route
                        path={`/profile/${user?.user?._id || 'undifine'}`}
                        element={<Profile user={user} setUser={setUser}/>}

                    />
                    <Route
                        path={'/userProfile/:userId'}
                        element={<UserProfile currentUser={user}/>}
                    />
                    <Route
                        path={'/message'}
                        element={<Message user={user}/>}
                    />
                    <Route
                        path='/stories'
                        element={<StoriesDetailPage/>}


                    />
                    <Route
                        path={`/search`}
                        element={<SearchPage/>}

                    />

                </Routes>
                <BottomNavigateion currentId={currentId} setCurrentId={setCurrentId}/>
                {/* <Box sx={{ position: 'relative', bottom: '0', width: '100%', marginTop: '50px', display: { lg: 'block', md: 'block', sm: 'block', xs: 'block' } }}>
          <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={2} >
            <Box sx={{ width: 24, height: 24, color: 'gray' }}>
              <Catsvg style={{ width: 24, height: 24 }} />
            </Box>
            <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
          </Stack>
        </Box> */}

            </BrowserRouter>

        </UserContext.Provider>


    );
}


export default App;
