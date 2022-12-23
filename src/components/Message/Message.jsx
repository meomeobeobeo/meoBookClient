import {Box, Container, Stack, Typography} from '@mui/material'
import useStyles from './styles'


import React, {createContext, useState} from 'react'


import UserInfor from './UserInfor';
import MessageAndAction from './MessageAndAction'
import MessageAndActionDemo from './MessageAndActionDemo';
import Catsvg from '../../image/Catsvg';

export const ConversationContext = createContext()

const Message = ({user}) => {


    const classes = useStyles()
    // conversation id will be set when click the user panel in user List Component 
    const [conversationId, setConversationId] = useState('')
    const [userDetailConnect, setUserDetailConnect] = useState(null)
    const [appearComponent, setAppearComponent] = useState(true)


    return (
        <Container maxWidth='md' sx={{marginTop: '70px', padding: '0 0'}}>


            <Stack

                spacing={0}
                sx={{
                    width: '100%',
                    height: {lg: '544px', md: '544px', sm: '544px', xs: 'auto'},
                    border: '1px solid #ccc',
                    flexDirection: {
                        lg: 'row', md: 'row', sm: 'row', xs: 'row'
                    },
                    overflow: 'hidden',


                }}


            >

                {/* send data is conversationId to child component */}
                <ConversationContext.Provider value={{
                    conversationId: conversationId,
                    setConversationId: setConversationId,
                    userDetailConnect: userDetailConnect,
                    setUserDetailConnect: setUserDetailConnect,
                    appearComponent: appearComponent,
                    setAppearComponent: setAppearComponent,
                }}>

                    {/* Left content is user Infor , list user message */}

                    <UserInfor/>

                    {/* Right component is message of user */}
                    {

                        userDetailConnect ? <MessageAndAction/> : <MessageAndActionDemo/>

                    }

                </ConversationContext.Provider>


            </Stack>
            <Box sx={{
                position: 'relative',
                bottom: '0',
                width: '100%',
                marginTop: '12px',
                display: {lg: 'block', md: 'block', sm: 'block', xs: 'block'}
            }}>
                <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={2}>
                    <Box sx={{width: 24, height: 24, color: 'gray'}}>
                        <Catsvg style={{width: 24, height: 24}}/>
                    </Box>
                    <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
                </Stack>
            </Box>

        </Container>
    )
}

export default Message