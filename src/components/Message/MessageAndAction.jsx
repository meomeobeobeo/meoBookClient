import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import CallIcon from '../../image/CallIcon'
import Emotion from '../../image/Emotion'
import ImageIcon from '../../image/ImageIcon'
import InforIcon from '../../image/InforIcon'
import LikeUnactive from '../../image/LikeUnactive'
import VideoCallIcon from '../../image/VideoCallIcon'
import ContentMessage from './ContentMessage'
import useStyles from './styles'
import { io } from 'socket.io-client'
import { SocketContext, UserContext } from '../../App'
import { ConversationContext } from './Message'
import * as api from '../../api/index'
import { v4 as uuidv4 } from 'uuid';
import FileBase64 from '../../FileBase64'
// import FileBase64 from 'react-file-base64'




const MessageAndAction = () => {

    const classes = useStyles()
    const user = useContext(UserContext)
    const userDetailConnect = useContext(ConversationContext).userDetailConnect
    const conversationId = useContext(ConversationContext).conversationId
   

    const [inputAppear, setinputAppear] = useState(false)





    // array of all message object fetch from data base
    const [messages, setMessages] = useState([])
    console.log(messages)


    // arrival message get from socket server
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [imgList, setImgList] = useState([]);


    // form message
    const [formMessage, setFormMessage] = useState({
        senderId: user?.user?._id,
        createdAt: new Date(),
        messageId: uuidv4(),
        textMessage: '',
        images: [],

    })




    const scrollRef = useRef()
    const socket = useRef()

    // get message from server 
    useEffect(() => {
        if (conversationId) {

            const data = api.getMessage(conversationId)
            data
                .then(res => {
                    setMessages(res.data)
                })

        }




    }, [conversationId])






    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) => {
            console.log(data)

            setArrivalMessage(data)
        })

    },[])

    useEffect(() => {
        setMessages(prev => [...prev, arrivalMessage])

    }, [arrivalMessage])


    useEffect(() => {

        socket.current.emit('addUser', user?.user?._id)
        socket.current.on('getUsers', users => {
            console.log(users)

        })


    }, [user])
    // fetch message from 

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })

    }, [messages])










    const handleSendMessage = async () => {
        await api.createMessage(conversationId, formMessage)
        // send data to socket server 
        socket.current?.emit("sendMessage", {
            senderId: user?.user?._id,
            receiverId: userDetailConnect?._id,
            messageData: formMessage
        })
        setMessages(prev => [...prev, formMessage])


    }


    return (
        <>
            <Stack

                flexDirection='column'
                sx={{
                    width: '60%',
                    height: 'inherit',
                    position: 'relative'






                }}>
                {/* title */}
                <Box className={classes.header}
                    sx={{

                        justifyContent: 'space-between!important'

                    }}

                >
                    {/* Avartar Box */}
                    <Stack
                        flexDirection='row'
                        sx={{
                            marginLeft: '40px'
                        }}


                    >
                        <Avatar sx={{ width: 32, height: 32, display: 'inline-block' }} src={userDetailConnect.avatarUrl}>

                        </Avatar>

                        <Typography
                            varian='body2'
                            sx={{
                                color: '#262626',
                                display: 'inline-block',
                                lineHeight: '40px',
                                margin: "0 12px 0 12px"


                            }}
                            fontSize='14px'
                            fontWeight={600}


                        >{userDetailConnect.name}</Typography>




                    </Stack>

                    {/* Icon Button call , video call , infor User  */}
                    <Stack direction='row'>
                        {/* call */}
                        <IconButton>
                            <CallIcon width={24} height={24} />

                        </IconButton>
                        {/* video call */}
                        <IconButton>
                            <VideoCallIcon width={24} height={24} />

                        </IconButton>
                        {/* infor user */}
                        <IconButton>
                            <InforIcon width={24} height={24} />
                        </IconButton>

                    </Stack>


                </Box>




                {/* content message */}
                <Box sx={{ width: '100%', height: '400px', overflow: 'auto' }}>
                    <Box sx={{ margin: '50px 8px 4px 20px' }}>
                        {/* <ContentMessage />
                        <ContentMessage own={true} />
                        <ContentMessage />
                        <ContentMessage /> */}

                        {
                            messages.map((message, index) => {
                                let own = message?.senderId === user?.user?._id



                                return (

                                    <div key={message?.messageId} ref={scrollRef}>
                                        <ContentMessage refSocket = {socket} messages = { messages} setMessages = {setMessages}  key={message?.messageId} messageData={message} own={own} />
                                    </div>

                                )




                            })


                        }


                    </Box>

                </Box>





                {/* input message */}
                <Stack sx={{
                    position: 'absolute',
                    bottom: '16px',
                    width: '100%',
                    display: 'flex',




                }}>
                    {/* input message */}
                    <Box
                        sx={{
                            width: '96%',
                            display: 'flex',
                            flexDirection: 'row',
                            border: '1px solid #ccc',
                            borderRadius: '24px',
                            margin: 'auto'

                        }}

                    >


                        {/* icon */}
                        <IconButton>
                            <Emotion width={24} height={24} />
                        </IconButton>

                        <Box sx={{ width: '80%', marginLeft: '8px' }}>
                            <input

                                onChange={(e) => {

                                    setFormMessage({ ...formMessage,createdAt: new Date(), textMessage: e.target.value })
                                    setinputAppear(true ? e.target.value !== '' : false)
                                }}
                                value={formMessage.textMessage}
                                placeholder="Message...."
                                className={`imputmessage`}
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    border: 'none',

                                }}
                            >

                            </input>
                        </Box>


                        {
                            true && (

                                < IconButton        >


                                    <label style={{
                                        margin: 0,
                                        padding: 0,
                                        height: '24px'
                                    }} htmlFor='message-image'>

                                        <FileBase64
                                            sx={{ display: "none" }}
                                            id='message-image'
                                            type="file"
                                            multiple={true}
                                            onDone={(e) => {
                                                const imgData = e.map((img) => {
                                                    return img.base64
                                                })

                                                setFormMessage({ ...formMessage,createdAt: new Date(), images: imgData })




                                            }}

                                        />


                                        <ImageIcon width={24} height={24} />


                                    </label>




                                </IconButton>






                            )
                        }
                        {
                            true && (
                                <IconButton onClick={() =>{
                                    
                                }}>
                                    <LikeUnactive width={24} height={24} />
                                </IconButton>

                            )
                        }
                        {
                            true && (
                                <IconButton
                                    onClick={() => {
                                        handleSendMessage()
                                        setFormMessage({
                                            senderId: user?.user?._id,
                                            createdAt: new Date(),
                                            messageId: uuidv4(),
                                            textMessage: '',
                                            images: [],
                                        })
                                        setImgList([])
                                    }} >
                                    <Typography variant='body2' fontSize={14} fontWeight={600} color='primary'>Send</Typography>
                                </IconButton>

                            )
                        }




                    </Box>


                </Stack>

            </Stack>

        </>
    )
}

export default MessageAndAction