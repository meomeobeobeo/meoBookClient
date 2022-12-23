import {Avatar, Box, Stack, Typography} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import useStyles from './styles'
import * as api from '../../api/index'
import {ConversationContext} from './Message'
import {UserContext} from '../../App'


const UserDetailConnect = ({userId, conversationId, setConversationId}) => {
    const {userDetailConnect, setUserDetailConnect} = useContext(ConversationContext)
    const [userData, setUserData] = useState(null)
    const setAppearComponent = useContext(ConversationContext).setAppearComponent
    const [isActive, setIsactive] = useState('none')
    const userStatus = useContext(UserContext).userStatus


    useEffect(() => {
        const data = api.getUserData(userId)
        data
            .then(userData => {
                setUserData(userData.data)

                return userData.data


            })


    }, [userId, userStatus])
    useEffect(() => {

        userStatus.forEach(element => {

            if (element.friendId === userData?._id && element.status === 'active') {
                setIsactive('block')


            }


        });

    }, [userData, userStatus])


    const handleSetConversationId = () => {

        setConversationId(conversationId)
        setUserDetailConnect(userData)


    }


    const classes = useStyles()
    return (
        <div>

            <Stack onClick={() => {

                handleSetConversationId()
                setAppearComponent(false)
            }} direction='row' className={classes.userBox}>
                <Box sx={{position: 'relative'}}>
                    <Avatar src={userData?.avatarUrl} className={classes.nomalAvatar}>


                    </Avatar>

                    {/* Status active of user  */}
                    <Box
                        sx={{display: `${isActive}`}}
                        className='dot-nomal'
                    ></Box>
                </Box>
                <Stack direction='column'>
                    <Typography variant='body2' fontSize={16} sx={{
                        marginLeft: '12px',
                        marginTop: '8px'
                    }}>{userData?.name}</Typography>
                    <Typography variant='body2' fontSize={14} sx={{
                        marginLeft: '12px',
                        color: '#ccc',
                        display: `${isActive}`
                    }}>
                        Active Now
                    </Typography>
                </Stack>


            </Stack>
        </div>
    )
}

export default UserDetailConnect