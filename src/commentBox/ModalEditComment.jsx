import {Button, Modal, TextField} from '@mui/material';
import {Box} from '@mui/system';
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {editComment} from '../actions/posts';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: 'none',
    p: 4,
    display: 'flex',
    flexDirection: 'row',
};

const ModalEditComment = ({
                              openModalEditComment,
                              handleCloseModalEditComment,
                              lastComment,
                              postId,
                              user,
                              commentId
                          }) => {


    const dispatch = useDispatch()
    const [content, setContent] = useState('')


    const handleEditComment = async () => {

        dispatch(editComment({

            _id: postId,
            commentId: commentId,

            commentData: {
                avatarUrl: user?.user?.avatarUrl,
                name: lastComment.name,
                content: content,
                commentId: commentId,
                userId: lastComment.userId,

            }
        }))


    }


    return (
        <>
            <Modal
                keepMounted
                open={openModalEditComment}
                onClose={handleCloseModalEditComment}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        id="standard-multiline-static"
                        multiline
                        rows={2}
                        placeholder='Edit your comment'
                        variant="standard"
                        sx={{
                            width: '100%'
                        }}
                        value={content}

                        onChange={(e) => {
                            setContent(e.target.value)


                        }}
                    />
                    <Button
                        onClick={
                            (e) => {

                                handleEditComment()

                                setContent('');
                                handleCloseModalEditComment()


                            }
                        }
                        sx={{
                            textTransform: 'none',
                            margin: '8px 8px -8px 8px',


                        }}
                    >
                        Post
                    </Button>


                </Box>

            </Modal>


        </>
    )
}

export default ModalEditComment