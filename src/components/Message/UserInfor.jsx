import { Box, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import WriteIcon from '../../image/WriteIcon'
import UserList from './UserList'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useStyles from './styles'
import { UserContext } from '../../App';
import { useEffect } from 'react';
import * as api from '../../api/index'

const UserInfor = () => {

    const classes = useStyles()
    const user = useContext(UserContext)
    const [conversationList , setConversationList] = useState([])
    const [senderList, setSenderList] = useState([])
   

    useEffect(()=>{
       
        const data = api.getConversation(user?.user?._id)
        data
            .then((listConversation)=>{
                
                setConversationList(listConversation.data)
                let listPerson = listConversation?.data.map((conversation)=>{
                    let person=''
                   
                    for(let i=0 ;i<conversation?.members.length;i++){
                        if(conversation?.members[i] !== user?.user?._id){
                            person = conversation?.members[i]
                        }
                        

                    }

                    return {
                        personId : person,
                        conversationId : conversation._id
                    }
                })
            //   sender list you comunicate in history
                setSenderList(listPerson)
               

            })
        
        

    },[user])



   
    






    return (
        <>
            <Box
                sx={{
                    width: '40%',
                    borderRight: '1px solid #ccc',
                    height: 'inherit',
                    display: 'inline-block'


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
                        <ExpandMoreIcon />


                    </Box>

                    <Box
                        sx={{
                            position: "absolute",
                            right: '12px',

                        }}
                    >
                        <WriteIcon width={24} height={24} />


                    </Box>

                </Box>

                {/* User List component */}
                <UserList  senderList = {senderList}   />

                {/*  senderList return {
                        personId : person,
                        conversationId : conversation._id
                    } */}

                




            </Box>
        </>
    )
}

export default UserInfor