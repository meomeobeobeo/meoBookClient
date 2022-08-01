import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material';
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

const ExpandMore = styled((props) => {
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
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { lg: '82%', md: '82%', sm: '100%', xs: '100%' },
    height: { lg: '93%', md: '93%', sm: '100%', xs: '100%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: '4px',
    overflow: "auto",
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
                <Fade in={openDetailPost}>
                    <Box sx={style}>
                        <Stack direction='row' sx={{
                            flexWrap: 'wrap',

                        }}>
                            <Box

                                sx={{
                                    backgroundColor: '#111',
                                    width: { lg: '56%', md: '56%', sm: '100%' },


                                }}>

                                <Box sx={{
                                    marginTop: '28px',
                                    marginBottom: '28px',

                                }}>
                                    <Card
                                        className={classes.card}


                                    >
                                        <CardHeader
                                            sx={{
                                                boxShadow: 'none',
                                                width: '100%',
                                                display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
                                                borderBottom: '1px solid #ccc',
                                                backgroundColor: '#ccc',
                                                padding: 1,

                                            }}
                                            onClick={handleClose}

                                            action={
                                                <IconButton aria-label="settings"  >
                                                    <Typography variant='body2' fontWeight='600' color='primary'>Exit</Typography>
                                                </IconButton>
                                            }




                                        />

                                        <CardMedia
                                            component="img"
                                            height="536"
                                            image={post.selectedFile}
                                            alt="img post"
                                            sx={{


                                            }}
                                        ></CardMedia>
                                    </Card>
                                </Box>




                            </Box>

                            {/* comment  */}
                            <Box
                                sx={{
                                    width: { lg: '44%', md: '44%', xs: '100%' },
                                }}
                            >

                                <Card
                                    className={classes.card}
                                    sx={{}}
                                >
                                    <CardHeader
                                        sx={{
                                            boxShadow: 'none',
                                            width: '96%',
                                            borderBottom: '1px solid #ccc'

                                        }}
                                        avatar={
                                            <Avatar src={user?.user?.avatarUrl} sx={{ width: 24, height: 24 }} aria-label="recipe">

                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon />
                                            </IconButton>
                                        }
                                        title={

                                            <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{user?.user?.name}</Typography>

                                        }



                                    />

                                    <Comment
                                        comments={post.comments}
                                        user={user}
                                        authorId={post.authorId}
                                        postId={post._id}


                                    ></Comment>





                                    {/* Emotion and action  */}

                                    <CardActions disableSpacing>
                                        <IconButton
                                            onClick={(e) => {
                                                handleLikePost()
                                                setLikeAction(!likeAction)

                                            }}
                                            aria-label="add to favorite " >
                                            {likeAction ? <LikeActive width='24px' height='24px' /> : <LikeUnactive width='24px' height='24px' />}



                                        </IconButton>
                                        {/* 
                    
                    
                                         Click comment buttton to open detail post 

                    
                    
                    
                                            */}
                                        <IconButton aria-label='comment' sx={{ marginLeft: '4px' }} onClick={() => {
                                            setOpenDetailPost(true)


                                        }}  >
                                            <CommentSvg width='24px' height='24px' />
                                        </IconButton>
                                        <IconButton aria-label='send' sx={{ marginLeft: '4px' }} >
                                            <SendSvg width='24px' height='24px' />
                                        </IconButton>

                                        <ExpandMore
                                            expand={expanded}
                                            onClick={handleExpanded}
                                            aria-expanded={expanded}
                                            aria-label="show more">


                                            {
                                                expanded ? <BookMarkFill width={24} height={24} /> : <BookMarkIcon width={24} height={24} />

                                            }







                                        </ExpandMore>



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
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', margin: '16px 8px' }}>

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





                                </Card>

                            </Box>



                        </Stack>



                    </Box>
                </Fade>
            </Modal>



        </>
    )
}

export default ModalDetailPost