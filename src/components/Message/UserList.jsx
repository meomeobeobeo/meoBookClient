import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'


import * as api from '../../api/index'
import UserDetailConnect from './UserDetailConnect'
import { ConversationContext } from './Message'
const UserList = ({ senderList }) => {

  const { conversationId, setConversationId } = useContext(ConversationContext)

















  return (
    <Stack direction='column' sx={{
      marginTop: '8px',
      height: '470px',
      overflow: 'auto',


    }}>
      {/* List user component  */}

      {
        senderList.map((child) => {
          return (
            <UserDetailConnect  key={child.personId} userId={child.personId} conversationId={child.conversationId} setConversationId={setConversationId} />
          )
        })
      }







    </Stack>
  )
}

export default UserList