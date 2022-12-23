import {Box, IconButton, Typography} from '@mui/material'
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react'
import WriteIcon from '../../image/WriteIcon'
import UserList from './UserList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from './styles'
import {UserContext} from '../../App';
import * as api from '../../api/index'
import StartIcon from '@mui/icons-material/Start';
import {ConversationContext} from './Message';

const UserInfor = () => {

    const classes = useStyles()
    const user = useContext(UserContext).user
    const [conversationList, setConversationList] = useState([])
    const [senderList, setSenderList] = useState([])
    const setAppearComponent = useContext(ConversationContext).setAppearComponent
    const appearComponent = useContext(ConversationContext).appearComponent
    const [appear, setAppear] = useState('inline-block')


    useEffect(() => {

        const data = api.getConversation(user?.user?._id)
        data
            .then((listConversation) => {

                setConversationList(listConversation.data)
                let listPerson = listConversation?.data.map((conversation) => {
                    let person = ''

                    for (let i = 0; i < conversation?.members.length; i++) {
                        if (conversation?.members[i] !== user?.user?._id) {
                            person = conversation?.members[i]
                        }


                    }

                    return {
                        personId: person,
                        conversationId: conversation._id
                    }
                })
                //   sender list you comunicate in history
                setSenderList(listPerson)


            })


    }, [user])
    useLayoutEffect(() => {
        if (appearComponent) {
            setAppear('inline-block')
        } else {
            setAppear('none')
        }


    }, [appearComponent])


    return (
        <>
            <Box
                sx={{
                    width: {lg: '40%', md: '40%', sm: '40%', xs: '100%'},
                    borderRight: '1px solid #ccc',
                    height: 'inherit',
                    display: {lg: 'inline-block', md: 'inline-block', sm: 'inline-block', xs: `${appear}`}


                }}
            >
                {/* Title  */}
                <Box
                    className={classes.header}

                >
                    <Box sx={{
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignContent: 'center',


                    }}>
                        <Typography varian="body2" fontWeight={600} sx={{
                            color: '#262626', display: 'inline-block', fontSize: '16px',
                        }}>{user?.user?.name}</Typography>
                        <ExpandMoreIcon/>


                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            right: '12px',

                        }}
                    >
                        <IconButton>
                            <WriteIcon width={24} height={24}/>
                        </IconButton>

                        <IconButton sx={{
                            display: {
                                lg: 'none!important',
                                md: 'none!important',
                                sm: 'none!important',
                                xs: 'inline-block'
                            }
                        }} onClick={() => {
                            setAppearComponent(false)
                        }}>
                            <StartIcon sx={{color: '#262626'}}/>
                        </IconButton>


                    </Box>

                </Box>

                {/* User List component */}
                <UserList senderList={senderList}/>

                {/*  senderList return {
                        personId : person,
                        conversationId : conversation._id
                    } */}


            </Box>
        </>
    )
}

export default UserInfor