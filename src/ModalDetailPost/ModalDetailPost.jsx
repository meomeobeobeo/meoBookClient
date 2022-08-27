import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Grow, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import useStyles from './styles'
import { useRef } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { addComment, likePost } from '../actions/posts'
import { v4 as uuidv4 } from 'uuid'
import Emotion from '../image/Emotion';
import SendIcon from '@mui/icons-material/Send';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Comment from '../commentBox/Comment';
import SendSvg from '../image/SendSvg';
import CommentSvg from '../image/CommentSvg';
import BookMarkIcon from '../image/BookMarkIcon';
import LikeActive from '../image/LikeActive';
import LikeUnactive from '../image/LikeUnactive';
import { styled } from '@mui/material/styles';
import BookMarkFill from '../image/BookMarkFill';
import moment from 'moment';

const BookMark = styled((props) => {
    const { expand, ...other } = props;



    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),

}));

const style = {
    position: 'absolute',
    top: { lg: '3%', md: '3%', sm: '0%', xs: '0%' },
    left: { lg: '9%', md: '9%', sm: '0%', xs: '0%' },
    transform: 'translate(-50%, -50%)',
    width: { lg: '82%', md: '82%', sm: '100%', xs: '100%' },
    height: { lg: '588px', md: '588px', sm: '100%', xs: '100vh' },
    bgcolor: 'background.paper',
    p: 0,
    borderRadius: '4px',
    overflow: "auto",
    overflowX: "hidden",
};

const ModalDetailPost = ({ openDetailPost, setOpenDetailPost, post, user, likeAction, setLikeAction }) => {

    const dispatch = useDispatch()
    const [commentData, setCommentData] = useState('')
    const [expanded, setExpanded] = useState(false)


    const handleExpanded = () => {
        setExpanded(!expanded)

    }







    const handleLikePost = async () => {

        dispatch(likePost(post._id))
    }

    const handleClose = () => {
        setOpenDetailPost(false);
    }
    const classes = useStyles()

    const handleChangeInputComment = (e) => {
        setCommentData(e.target.value)


    }

    const handleAddComment = async () => {
        dispatch(addComment({
            _id: post._id,
            commentData: {
                avatarUrl: user?.user?.avatarUrl,
                name: user?.user?.name,
                content: commentData,
                commentId: uuidv4(),
                userId: user?.user?._id,

            }
        }))



    }






    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDetailPost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{

                }}
            >
                <Grow
                    style={{ transformOrigin: '50% 50%' }}
                    {...(openDetailPost ? { timeout: 200 } : {})}
                    in={openDetailPost}>
                    <Box sx={style}>
                        <Stack direction='row' sx={{
                            flexWrap: 'wrap',
                            width: '100%',

                        }}>
                            <Box

                                sx={{
                                    backgroundColor: '#111',
                                    width: { lg: '56%', md: '56%', sm: '100%' , xs: '100%'},


                                }}>

                                <Box sx={{

                                    width: '100%',
                                    height: '100%',

                                }}>
                                    <Stack
                                        direction='column'
                                        sx ={{ 
                                            width: '100%!important',
                                            height: '100%!important'
                                        }}
                                        className={classes.card}


                                    >
                                        <Box
                                            sx={{
                                                boxShadow: 'none',
                                                width: '100%',
                                                height: '32px',
                                                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
                                                borderBottom: '1px solid #ccc',
                                                backgroundColor: '#ccc',
                                                padding: 1,



                                            }}
                                            onClick={handleClose}






                                        >
                                            <IconButton aria-label="settings"  >
                                                <Typography variant='body2' fontWeight='600' color='primary'>Exit</Typography>
                                            </IconButton>
                                        </Box>

                                        {/* <CardMedia
                                            component="img"

                                            image={post.selectedFile}
                                            alt="img post"
                                            sx={{
                                                height: { lg: '536px', md: '536px', sm: '536px', xs: '536px' }


                                            }}
                                        ></CardMedia> */}
                                        <Box sx={{
                                            width: '100%',
                                            height: { lg: '532px', md: '532px', sm: '532px', xs: '240px' },
                                            marginTop: '28px',
                                            marginBottom: '28px',
                                        }}>
                                            <img src={post.selectedFile}
                                                alt="meomeo"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }} />

                                        </Box>
                                    </Stack>
                                </Box>




                            </Box>

                            {/* comment  */}
                            <Box
                                sx={{
                                    width: { lg: '44%', md: '44%', xs: '100%' },
                                }}
                            >

                                <Stack
                                    direction='column'
                                    className={classes.card}
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            boxShadow: 'none',
                                            height: '48px',
                                            width: '100%',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            borderBottom: '1px solid #ccc',
                                            display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' }

                                        }}





                                    >

                                        <Stack direction='row' sx={{ marginLeft: '12px' }} spacing={2} >
                                            <Avatar src={user?.user?.avatarUrl} sx={{ width: 24, height: 24 }} aria-label="recipe">

                                            </Avatar>
                                            <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{user?.user?.name}</Typography>
                                        </Stack>

                                        <Box sx={{
                                            position: 'absolute',
                                            right: '12px',
                                        }} aria-label="settings">
                                            <MoreVertIcon />
                                        </Box>

                                    </Box>

                                    <Comment
                                        comments={post.comments}
                                        user={user}
                                        authorId={post.authorId}
                                        postId={post._id}


                                    ></Comment>





                                    {/* Emotion and action  */}

                                    <CardActions disableSpacing>
                                        <Box
                                            sx={{
                                                padding: '4px'
                                            }}
                                            onClick={(e) => {
                                                handleLikePost()
                                                setLikeAction(!likeAction)

                                            }}
                                            aria-label="add to favorite " >
                                            {likeAction ? <LikeActive width='24px' height='24px' /> : <LikeUnactive width='24px' height='24px' />}



                                        </Box>
                                        {/* 
                    
                    
                                         Click comment buttton to open detail post 

                    
                    
                    
                                            */}
                                        <Box aria-label='comment' sx={{ marginLeft: '4px', padding: '4px' }} onClick={() => {
                                            setOpenDetailPost(true)


                                        }}  >
                                            <CommentSvg width='24px' height='24px' />
                                        </Box>
                                        <Box aria-label='send' sx={{ marginLeft: '4px', padding: '4px' }} >
                                            <SendSvg width='24px' height='24px' />
                                        </Box>

                                        <BookMark
                                            expand={expanded}
                                            onClick={handleExpanded}
                                            aria-expanded={expanded}
                                            aria-label="show more">


                                            {
                                                expanded ? <BookMarkFill width={24} height={24} /> : <BookMarkIcon width={24} height={24} />

                                            }







                                        </BookMark>



                                    </CardActions>
                                    <Stack ml={2} direction='column' spacing={1}>

                                        {
                                            post.likes.length === 0 ? (
                                                <Typography variant='body2' fontWeight={600} sx={{ color: '#262626' }}>Be the first like this.</Typography>

                                            ) : (
                                                <Typography variant='body2' fontWeight={600} sx={{ color: '#262626' }}>{post.likes.length} likes</Typography>

                                            )

                                        }
                                        <Typography variant='body2' fontWeight={400} color='gray'>{moment(post.createdAt).calendar()}</Typography>



                                    </Stack>


                                    {/* textField add comment */}
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', margin: '16px 8px', marginBottom: { lg: '16px', md: '16px', sm: '16px', xs: '64px' } }}>

                                        <TextField
                                            value={commentData}
                                            id="input-with-icon-textfield"
                                            label="Comment"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Emotion width={24} height={24} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            variant="standard"
                                            sx={{ width: '85%' }}
                                            onChange={handleChangeInputComment}
                                        />
                                        <Button
                                            onClick={
                                                (e) => {

                                                    handleAddComment()
                                                    setCommentData('');

                                                }
                                            }
                                            sx={{
                                                textTransform: 'none',
                                                margin: '8px 8px -8px 8px',

                                            }}
                                            endIcon={<SendIcon />}>
                                            Post
                                        </Button>
                                    </Box>





                                </Stack>

                            </Box>



                        </Stack>



                    </Box>
                </Grow>
            </Modal>



        </>
    )
}

export default ModalDetailPost