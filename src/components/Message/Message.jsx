import { Avatar, Button, Container, IconButton, Stack, Typography } from '@mui/material'
import useStyles from './styles'



import React, { createContext, useEffect, useState } from 'react'


import UserInfor from './UserInfor';
import MessageAndAction from './MessageAndAction'
import { io } from 'socket.io-client'
import { useRef } from 'react';
import MessageAndActionDemo from './MessageAndActionDemo';
export const ConversationContext = createContext()

const Message = ({ user }) => {










    const classes = useStyles()
    // conversation id will be set when click the user panel in user List Component 
    const [conversationId, setConversationId] = useState('')
    const [ userDetailConnect ,setUserDetailConnect ] = useState(null)
 







    return (
        <Container maxWidth='md' sx={{ marginTop: '70px', padding: '0 0' }}>




            <Stack
                direction='row'
                spacing={0}
                sx={{
                    width: '100%',
                    height: { lg: '544px', md: '544px', sm: '544px', xs: '544px' },
                    border: '1px solid #ccc',


                }}



            >

                {/* send data is conversationId to child component */}
                <ConversationContext.Provider value={{
                    conversationId:conversationId, 
                    setConversationId : setConversationId,
                    userDetailConnect : userDetailConnect,
                    setUserDetailConnect:setUserDetailConnect
                }} >

                    {/* Left content is user Infor , list user message */}
                    <UserInfor  />
                    {/* Right component is message of user */}
                   {
                    userDetailConnect ? <MessageAndAction  />: <MessageAndActionDemo  />
                   }

                </ConversationContext.Provider>








            </Stack>

        </Container>
    )
}

export default Message