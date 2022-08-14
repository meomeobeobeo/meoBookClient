import { Avatar, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import useStyles from './styles'
import * as api from '../../api/index'
import { ConversationContext } from './Message'

const UserDetailConnect = ({userId , conversationId , setConversationId}) => {
    const {userDetailConnect ,setUserDetailConnect}  =useContext(ConversationContext)
    const [userData , setUserData] = useState(null)
   
    useEffect(() => {
        const data = api.getUserData(userId)
        data
            .then(userData =>{
                setUserData(userData.data)
                

            })


    },[userId])
    const handleSetConversationId =  ()=>{
        setConversationId(conversationId)
        setUserDetailConnect(userData)
       
        
       
    }






    const classes = useStyles()
      return (
        <div>

            <Stack onClick = {handleSetConversationId} direction='row' className={classes.userBox}>
                <Avatar src={userData?.avatarUrl} className={classes.nomalAvatar} ></Avatar>
                <Stack direction='column'>
                    <Typography variant='body2' fontSize={16} sx={{
                        marginLeft: '12px',
                        marginTop: '8px'
                    }} >{userData?.name}</Typography>
                    <Typography variant='body2' fontSize={14} sx={{
                        marginLeft: '12px',
                        color: '#ccc'
                    }} >
                        Active Now
                    </Typography>
                </Stack>


            </Stack>
        </div>
    )
}

export default UserDetailConnect