import { Backdrop, Fade, Modal, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../actions/posts';



const styleConfirmDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
    height: '188px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 0,
    textAlign: 'center',



};

const ModalDeleteComment = ({ openConfirmDeleteComment, handleCloseConfirmDeleteComment, postId, commentId }) => {


    const [mouseDown1, setmouseDown1] = useState(false)
    const [mouseDown2, setmouseDown2] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()



    const handleDeleteComment = () => {
        dispatch(
            deleteComment({
                _id: postId,
                commentId: commentId
            })
        )

    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openConfirmDeleteComment}
                onClose={handleCloseConfirmDeleteComment}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openConfirmDeleteComment}>
                    <Stack sx={styleConfirmDelete} direction='column' spacing={2}  >
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{ pt: 4 }}

                        >
                            <Typography variant="h6" fontWeight='600' sx={{ color: '#111', fontSize: '18px' }}>Your comment will also delete . </Typography>
                            <Typography variant='body2' color='gray' >Meo meo</Typography>




                        </Stack>
                        <Stack direction="column" spacing={0} justifyContent='space-between'  >





                            <Typography color='error' className={mouseDown1 ? classes.pressModal : classes.modal} onMouseUp={() => { setmouseDown1(false) }} onMouseDown={() => { setmouseDown1(true) }} fontWeight='bold' fontSize={14} onClick={() => {
                                handleDeleteComment()
                                handleCloseConfirmDeleteComment()

                            }}          >You sure delete the comment</Typography>
                            <Typography color='gray' className={mouseDown2 ? classes.pressModal : classes.modal} onMouseUp={() => { setmouseDown2(false) }} onMouseDown={() => { setmouseDown2(true) }} onClick={() => { handleCloseConfirmDeleteComment() }} fontWeight='bold' fontSize={14}>Cancel</Typography>

                        </Stack>
                    </Stack>
                </Fade>
            </Modal>

        </>
    )
}

export default ModalDeleteComment