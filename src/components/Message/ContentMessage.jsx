import { Avatar, Backdrop, Box, Fade, IconButton, Modal, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import LikeActive from '../../image/LikeActive'
import LikeUnactive from '../../image/LikeUnactive'
import meo2 from '../../image/meo2.jpg'
import BoxOfImage from './BoxOfImage'
import { ConversationContext } from './Message'
import useStyles from './styles'
import * as api from '../../api/index'
import { UserContext } from '../../App'


// confirm delete message comonent 
const styleConfirmDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '360px',
    height: '188px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 0,
    textAlign: 'center',



};
const ModalDeleteMessage = ({ openConfirmDeleteMessage, handleCloseConfirmDeleteMessage, messageId, messages, setMessages, refSocket }) => {


    const [mouseDown1, setmouseDown1] = useState(false)
    const [mouseDown2, setmouseDown2] = useState(false)
    const userConnect = useContext(ConversationContext).userDetailConnect
    const user = useContext(UserContext).user
    const [arrivalMessage, setArrivalMessage] = useState(null)




    const classes = useStyles()







    const handleDeleteComment = async () => {
        await api.deleteMessage(messageId)
        const newMessages = messages.filter((message) => {
            return message.messageId !== messageId
        })
        setMessages(newMessages)
        refSocket.current.emit('deleteMessage', {
            senderId: user?.user?._id,
            messageId: messageId,
            receiverId: userConnect?._id
        })




    }
    useEffect(() => {
        refSocket.current.on("getDeleteMessage", (data) => {
           
            const newMessages = messages.filter((message) => {
                return message?.messageId !== data?.messageId
            })
            setMessages(newMessages)




        })

    }, [messages, refSocket, setMessages])

    // useEffect(() => {
    //     const newMessages = messages.filter((message) =>{
    //         return message.messageId !== arrivalMessage?.messageId
    //     })
    //     setMessages(newMessages)


    // }, [arrivalMessage, messages, setMessages])


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openConfirmDeleteMessage}
                onClose={handleCloseConfirmDeleteMessage}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openConfirmDeleteMessage}>
                    <Stack sx={styleConfirmDelete} direction='column' spacing={2}  >
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{ pt: 4 }}

                        >
                            <Typography variant="h6" fontWeight='600' sx={{ color: '#111', fontSize: '18px' }}>Your message will also delete . </Typography>
                            <Typography variant='body2' color='gray' >Meo meo</Typography>




                        </Stack>
                        <Stack direction="column" spacing={0} justifyContent='space-between'  >





                            <Typography color='error' className={mouseDown1 ? classes.pressModal : classes.modal} onMouseUp={() => { setmouseDown1(false) }} onMouseDown={() => { setmouseDown1(true) }} fontWeight='bold' fontSize={14} onClick={() => {
                                handleDeleteComment()
                                handleCloseConfirmDeleteMessage()

                            }}          >You sure delete the message</Typography>
                            <Typography color='gray' className={mouseDown2 ? classes.pressModal : classes.modal} onMouseUp={() => { setmouseDown2(false) }} onMouseDown={() => { setmouseDown2(true) }} onClick={() => { handleCloseConfirmDeleteMessage() }} fontWeight='bold' fontSize={14}>Cancel</Typography>

                        </Stack>
                    </Stack>
                </Fade>
            </Modal>

        </>
    )
}



// own is props exac current auth person .
const ContentMessage = ({ own, messageData, messages, setMessages, refSocket }) => {
    const classes = useStyles()
    const userConnect = useContext(ConversationContext).userDetailConnect
    const [openConfirmDeleteMessage, setOpenConfirmDeleteMessage] = useState(false)
    const handleCloseConfirmDeleteMessage = () => {
        setOpenConfirmDeleteMessage(false)
    }


    return (
        <>
            <Stack direction='column'    >
                <Stack direction='row' className={own ? classes.ownMessage : ''} sx={{

                    alignItems: 'flex-end',
                    marginBottom: '8px',




                }}>
                    {
                        // set action with own message is current user
                        own && (
                            <Stack direction='row'>
                                <IconButton
                                    onClick={() => {
                                        setOpenConfirmDeleteMessage(true)
                                    }}
                                    className={!own ? classes.ownIcon : ''} >
                                    <AiOutlineDelete style={{ color: '#262626' }} />
                                </IconButton>
                                <IconButton>
                                    <LikeUnactive width={24} height={24} />
                                </IconButton>
                            </Stack>
                        )
                    }

                    <Avatar className={own ? classes.ownAvatar : ''} sx={{ width: 24, height: 24 }} src={userConnect?.avatarUrl}></Avatar>

                    {/* content Of message  */}
                    <Stack direction='column' sx={{ position: 'relative' }}  >
                        <Typography variant="body2" color="gray" fontSize={12} sx={{
                            margin: '0 12px 4px 24px'
                        }} >{moment(messageData?.createdAt).calendar()}</Typography>
                        {
                            messageData?.textMessage !== '' &&
                            (
                                <Typography className={own ? classes.ownContent : ''} fontSize={14} variant='body2' sx={{
                                    padding: '16px 16px',
                                    margin: '0 0 0 12px',
                                    maxWidth: '200px!important',
                                    border: '1px solid #ccc',
                                    borderRadius: '20px',
                                    height: 'auto',
                                    overflow: 'hidden',
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }

                                }} >
                                    {messageData?.textMessage}
                                </Typography>
                            )
                        }
                        {
                            messageData?.images?.length > 0 && messageData?.images?.map((imgData, index) => {


                                return (

                                    <div key={index}>
                                        <BoxOfImage

                                            imgData={imgData}

                                        >

                                        </BoxOfImage>
                                    </div>


                                )
                            })

                        }
                        {/* the likes of message  */}
                        <IconButton sx={{
                            p: '2px',
                            backgroundColor: '#fff',
                            position: 'absolute',



                        }}>
                            <LikeActive width={16} height={16} />
                        </IconButton>



                    </Stack>

                    {
                        // set action with own message is client user 
                        !own &&
                        (
                            <Stack direction='row'>
                                <IconButton className={!own ? classes.ownIcon : ''} >
                                    <AiOutlineDelete />
                                </IconButton>
                                <IconButton>
                                    <LikeUnactive width={24} height={24} />
                                </IconButton>
                            </Stack>
                        )

                    }





                </Stack>


            </Stack>
            {/* modal delete message */}
            <ModalDeleteMessage refSocket={refSocket} messages={messages} setMessages={setMessages} openConfirmDeleteMessage={openConfirmDeleteMessage} handleCloseConfirmDeleteMessage={handleCloseConfirmDeleteMessage} messageId={messageData?.messageId} />
        </>
    )
}

export default ContentMessage