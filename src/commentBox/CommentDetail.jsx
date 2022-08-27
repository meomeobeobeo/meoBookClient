import { Avatar, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import ModalDeleteComment from './ModalDeleteComment'
import ModalEditComment from './ModalEditComment'

const CommentDetail = ({ comment, postId, allowEditOrDelete, confirmWriteComment, user }) => {


    const [openConfirmDeleteComment, setOpenConfirmDeleteComment] = useState(false)

    const handleCloseConfirmDeleteComment = () => {
        setOpenConfirmDeleteComment(false)
    }



    const [openModalEditComment, setOpenModalEditComment] = useState(false)
    const handleCloseModalEditComment = () => {
        setOpenModalEditComment(false)
    }




    return (
        <div>

            <Box
                key={comment.commentId}
                onClick={() => {

                }}
                sx={{
                    margin: 0,
                    padding: 0,
                }}>

                <Box sx={{
                    margin: 0,
                    padding: 0,
                    display: 'flex',
                   
                    flexDirection: 'row',
                }}>
                    <Avatar sx={{ display: 'inline-block', width: 32, height: 32 }} src={comment.avatarUrl} alt='img'>
                        {comment.name[0]}

                    </Avatar>
                    <Stack direction="column">
                        <Typography variant='body2' fontWeight={600} sx={{ color: '#111', display: 'inline-block', marginLeft: 2, }}   >{comment.name}</Typography>
                        <Typography variant='body2' fontWeight={400} sx={{ color: '#111', display: 'inline-block', marginLeft: 1, p:2 , backgroundColor :'#efefef' , borderRadius:'12px' , maxWidth:'90%'   }}>{comment.content}</Typography>

                    </Stack>

                </Box>

                {/* action delete or edit comment */}
                {
                    allowEditOrDelete && (
                        <Box
                            sx={{
                                marginLeft: 3
                            }}
                        >

                            {/* delete */}
                            <Box onClick={() => {
                                setOpenConfirmDeleteComment(true)


                            }}
                                sx={{
                                    color: 'gray',
                                    display: 'inline-block',
                                    marginLeft: 1,
                                    p: 1,
                                    cursor: 'pointer',
                                }}>

                                <Typography
                                    variant='body2'
                                    fontWeight={500}
                                    fontSize={12}

                                >Delete


                                </Typography>

                            </Box>

                            {/* edit */}

                            {
                                confirmWriteComment && (
                                    <Box onClick={() => {
                                        setOpenModalEditComment(true)


                                    }}
                                        sx={{
                                            color: 'gray',
                                            display: 'inline-block',
                                            
                                            p: 1,
                                            cursor: 'pointer',

                                        }}>

                                        <Typography
                                            variant='body2'
                                            fontWeight={500}
                                            fontSize={12}

                                        >Edit


                                        </Typography>

                                    </Box>
                                )
                            }

                        </Box>
                    )
                }










                {/* modal delete comment */}
                <ModalDeleteComment
                    openConfirmDeleteComment={openConfirmDeleteComment}
                    handleCloseConfirmDeleteComment={handleCloseConfirmDeleteComment}
                    postId={postId}
                    commentId={comment.commentId}
                />
            </Box>

            {/* Modal edit comment  */}
            <ModalEditComment
                openModalEditComment={openModalEditComment}
                handleCloseModalEditComment={handleCloseModalEditComment}
                lastComment={comment}
                postId={postId}
                user={user}
                commentId={comment.commentId}
            />


        </div>
    )
}

export default CommentDetail