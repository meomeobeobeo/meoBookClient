import {Box, CardContent, IconButton, Stack, Typography} from '@mui/material'
import React from 'react'
import AddIcon from '../image/AddIcon'
import CommentDetail from './CommentDetail'


const Comment = ({comments, authorId, user, postId}) => {


    if (!comments?.length) {

        return (
            <>

                <CardContent
                    sx={{
                        display: 'flex',
                        minHeight: {lg: '310px', md: '310px', sm: '310px', xs: '200px'},
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',


                    }}

                >

                    <Stack direction="column" spacing={1} sx={{

                        alignItems: 'center',
                        alignContent: 'center',
                        margin: 'auto',

                    }}>
                        <Typography variant='h5' fontWeight={500}>No comments yet .</Typography>
                        <Typography variant='body2'>Start the conversation.</Typography>

                    </Stack>


                </CardContent>


            </>
        )


    }


    return (
        <>

            <CardContent
                sx={{
                    display: 'flex',
                    minHeight: '200px',
                    maxHeight: '310px',
                    overflow: 'auto'


                }}

            >

                <Stack direction="column" spacing={1} sx={{

                    width: '100%',
                    position: 'relative',
                    minHeight: {lg: '310px', md: '310px', sm: '310px', xs: '310px'},
                    maxHeight: {lg: '310px', md: '310px', sm: '310px', xs: '310px'},


                }}>

                    {/* show comment */}

                    <Box sx={{
                        margin: 0,
                        padding: 0,


                    }}>
                        {
                            comments.map((comment, index) => {


                                let exacAuthor = (authorId === user?.user?._id)
                                let confirmWriteComment = (comment.userId === user?.user?._id)


                                let allowEditOrDelete = exacAuthor || confirmWriteComment;


                                return (
                                    <div key={comment.commentId}>
                                        <CommentDetail user={user} comment={comment} postId={postId}
                                                       allowEditOrDelete={allowEditOrDelete}
                                                       confirmWriteComment={confirmWriteComment}/>

                                    </div>


                                )
                            })

                        }
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            bottom: '0px',
                            marginTop: '32px'


                        }}>
                            <IconButton onClick={() => {

                            }}>
                                <AddIcon height={24} width={24}/>

                            </IconButton>
                        </Box>

                    </Box>


                    {/* add show comment  */}


                </Stack>


            </CardContent>

            {/* Modal Edit comment  */}


        </>
    )


}

export default Comment