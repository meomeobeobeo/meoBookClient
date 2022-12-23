import {Avatar, Box, IconButton, Stack, Typography} from '@mui/material'
import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from 'react'
import CallIcon from '../../image/CallIcon'
import Emotion from '../../image/Emotion'
import ImageIcon from '../../image/ImageIcon'
import InforIcon from '../../image/InforIcon'
import LikeUnactive from '../../image/LikeUnactive'
import VideoCallIcon from '../../image/VideoCallIcon'
import ContentMessage from './ContentMessage'
import useStyles from './styles'
import {UserContext} from '../../App'
import {ConversationContext} from './Message'
import * as api from '../../api/index'
import {v4 as uuidv4} from 'uuid';
import FileBase64 from '../../FileBase64'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// import FileBase64 from 'react-file-base64'


const MessageAndAction = () => {

    const classes = useStyles()
    const user = useContext(UserContext).user
    const userDetailConnect = useContext(ConversationContext).userDetailConnect
    const conversationId = useContext(ConversationContext).conversationId
    const setAppearComponent = useContext(ConversationContext).setAppearComponent
    const appearComponent = useContext(ConversationContext).appearComponent
    const userStatus = useContext(UserContext).userStatus
    const [appear, setAppear] = useState('inline-block')
    const messageAction = useContext(UserContext).socket
    const [inputAppear, setinputAppear] = useState(false)
    const [isActive, setIsactive] = useState('none')


    // array of all message object fetch from data base
    const [messages, setMessages] = useState([])


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


    // get message from server
    useLayoutEffect(() => {
        if (!appearComponent) {
            setAppear('inline-block')
        } else {
            setAppear('none')
        }


    }, [appearComponent])


    // check user is active or not
    useEffect(() => {
        userStatus.forEach(element => {

            if (element.friendId === userDetailConnect._id && element.status === 'active') {
                setIsactive('block')


            }


        });


    }, [userDetailConnect, userStatus])


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

        messageAction.current.on("getMessage", (data) => {


            setArrivalMessage(data)
        })

    }, [])
    useEffect(() => {

        messageAction.current.emit('addUser', user?.user?._id)
        messageAction.current.on('getUsers', users => {


        })


    }, [messageAction, user])


    useEffect(() => {
        setMessages(prev => [...prev, arrivalMessage])

    }, [arrivalMessage])


    // fetch message from

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})

    }, [messages])


    const handleSendMessage = async () => {
        // send data to socket server 
        messageAction.current?.emit("sendMessage", {
            senderId: user?.user?._id,
            receiverId: userDetailConnect?._id,
            messageData: {...formMessage, images: imgList}
        })
        setMessages(prev => [...prev, formMessage])
        await api.createMessage(conversationId, formMessage)


    }


    return (
        <>
            <Stack

                flexDirection='column'
                sx={{
                    width: {lg: '60%', md: '60%', sm: '60%', xs: '100%'},
                    height: '544px',
                    position: 'relative',
                    display: {lg: 'inline-block', md: 'inline-block', sm: 'inline-block', xs: `${appear}`}


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
                            marginLeft: {lg: '32px', md: '32px', sm: '32px', xs: '0'}
                        }}


                    >
                        <IconButton sx={{
                            display: {
                                lg: 'none!important',
                                md: 'none!important',
                                sm: 'none!important',
                                xs: 'inline-block'
                            }
                        }} onClick={() => {
                            setAppearComponent(!appearComponent)
                        }}>
                            <ArrowBackIcon sx={{color: '#262626'}}/>
                        </IconButton>
                        <Box sx={{position: 'relative'}}>
                            <Avatar sx={{width: 40, height: 40, display: 'inline-block', marginTop: '4px'}}
                                    src={userDetailConnect.avatarUrl}>

                            </Avatar>


                            {/* 
                            
                            status active of user 
                            
                            */}
                            <Box sx={{display: `${isActive}`}} className='dot-sm'></Box>
                        </Box>

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
                            <CallIcon width={24} height={24}/>

                        </IconButton>
                        {/* video call */}
                        <IconButton>
                            <VideoCallIcon width={24} height={24}/>

                        </IconButton>
                        {/* infor user */}
                        <IconButton>
                            <InforIcon width={24} height={24}/>
                        </IconButton>

                    </Stack>


                </Box>


                {/* content message */}
                <Box sx={{
                    width: '100%',
                    height: {lg: '400px', md: '400px', sm: '400px', xs: '400px'},
                    overflow: 'auto'
                }}>
                    <Box sx={{margin: '50px 8px 4px 20px'}}>
                        {/* <ContentMessage />
                        <ContentMessage own={true} />
                        <ContentMessage />
                        <ContentMessage /> */}

                        {
                            messages.map((message, index) => {
                                let own = message?.senderId === user?.user?._id


                                return (

                                    <div key={message?.messageId} ref={scrollRef}>
                                        <ContentMessage refSocket={messageAction} messages={messages}
                                                        setMessages={setMessages} key={message?.messageId}
                                                        messageData={message} own={own}/>
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
                            <Emotion width={24} height={24}/>
                        </IconButton>

                        <Box sx={{width: '80%', marginLeft: '8px'}}>
                            <input

                                onChange={(e) => {

                                    setFormMessage({...formMessage, createdAt: new Date(), textMessage: e.target.value})
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

                                < IconButton>


                                    <label style={{
                                        margin: 0,
                                        padding: 0,
                                        height: '24px'
                                    }} htmlFor='message-image'>

                                        <FileBase64
                                            sx={{display: "none"}}
                                            id='message-image'
                                            type="file"
                                            multiple={true}
                                            onDone={(e) => {
                                                const imgData = e.map((img) => {
                                                    return img.base64
                                                })

                                                setFormMessage({...formMessage, createdAt: new Date(), images: imgData})
                                                setImgList(imgData)


                                            }}

                                        />


                                        <ImageIcon width={24} height={24}/>


                                    </label>


                                </IconButton>


                            )
                        }
                        {
                            true && (
                                <IconButton onClick={() => {

                                }}>
                                    <LikeUnactive width={24} height={24}/>
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
                                    }}>
                                    <Typography variant='body2' fontSize={14} fontWeight={600}
                                                color='primary'>Send</Typography>
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