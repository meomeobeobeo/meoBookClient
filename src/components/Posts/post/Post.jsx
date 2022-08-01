import react, { useEffect, useRef } from 'react';
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, IconButton, Typography, Button, Tooltip, Divider, MenuItem, Menu, Box, TextField, InputAdornment, Stack } from '@mui/material'
import { purple } from '@mui/material/colors'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts'
import useStyles from './styles'
import FormLog from '../../Form/FormLog';
import Form from '../../Form/Form';
import { likePost, addComment } from '../../../actions/posts'
import { RiMessengerLine, RiUserFollowLine } from 'react-icons/ri'
import { AiOutlineProfile } from 'react-icons/ai';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import CommentSvg from '../../../image/CommentSvg'
import SendSvg from '../../../image/SendSvg';
import LikeUnactive from '../../../image/LikeUnactive';
import LikeActive from '../../../image/LikeActive';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import ModalDetailPost from '../../../ModalDetailPost/ModalDetailPost';
import {Link} from 'react-router-dom'











const ExpandMore = styled((props) => {
    const { expand, ...other } = props;



    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),

}));



const Post = ({ post, setCurrentId, currentUserId, user }) => {


    /// set expan the user infor option as follow , message , profile page of this user 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [openPopup, setOpenPopup] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [expanded, setExpanded] = useState(false)
    const [moreOption, setMoreOption] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [commentData, setCommentData] = useState('')


    const exactAuthor = user?.user?._id === post.authorId
    const linkToProfile = user && exactAuthor ? `/profile/${user.user._id }`:  `/userProfile/${post.authorId}`
  








    // preview data comment
    const previewComment = [

    ]
    if(post.comments.length > 10){
        previewComment.push(post.comments[0])
        previewComment.push(post.comments[1])

    }
   
    


    // check current user like the post
    const find = post.likes.find(id => id === currentUserId)


    const [likeAction, setLikeAction] = useState(find)

    const commentRef = useRef()
    const [openDetailPost, setOpenDetailPost] = useState(false);
    
    







    const handleLikePost = async () => {

        dispatch(likePost(post._id))
    }
    const handleAddComment = async () => {
        dispatch(addComment({
            _id: post._id,
            commentData: {
                avatarUrl: user?.user?.avatarUrl,
                name: user?.user?.name,
                content: commentData,
                commentId :uuidv4(),
                userId : user?.user?._id,
            }
        }))



    }
    const handleChangeInputComment = (e) => {
        setCommentData(e.target.value)
        

    }

    const handleExpanded = () => {
        setExpanded(!expanded)

    }


    const handleDeletePost = async () => {


        dispatch(deletePost(post._id));

    }
    useEffect(() => {
        if (!moreOption) {
            setCurrentId(0)
        }
    }, [moreOption, setCurrentId])


    return (
        <>
            <Card className={classes.cardBody} sx={{
                backgroundColor: '#ffffff'

            }}
            >
                <CardHeader

                    sx = {{
                        padding:1

                    }}
                    avatar={



                        <>
                            <Tooltip title="Information user">
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 1 }}
                                    aria-controls={open ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                >

                                    <Avatar
                                        sx={{ bgcolor: purple[500], padding:0 }}
                                        aria-label='recipe'
                                        src={post.authorAvatarUrl}



                                    >
                                        {post.name[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            {/* menu list option of person to connect as follow , make friend and message */}
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem component={Link} to={linkToProfile}onClick = {()=>{
                                 
                                }} >
                                    <ListItemIcon>
                                        <AiOutlineProfile />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Profile
                                    </ListItemText>
                                </MenuItem>

                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <RiUserFollowLine />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Follow.
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <RiMessengerLine />
                                    </ListItemIcon>
                                    Message
                                </MenuItem>

                            </Menu>

                        </>








                    }
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={() => {
                                setMoreOption(!moreOption)

                                setDisabled(!(post.authorId === currentUserId))


                            }}


                            >
                                <MoreVertIcon />

                            </IconButton>

                        </>

                    }
                    title={

                        <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{post.name}</Typography>

                    }
                    subheader={moment(post.createdAt).fromNow()}

                />
                {/* list choose with your post */}
                <Collapse in={moreOption} timeout='auto' unmountOnExit>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Choose your options...
                            </ListSubheader>
                        }
                    >
                        <ListItemButton
                            disabled={disabled}
                            onClick={() => {
                                setCurrentId(post._id)
                                setOpenPopup(!openPopup)

                            }}>
                            <ListItemIcon>
                                <ModeEditIcon />
                            </ListItemIcon>
                            <ListItemText primary='Edit post' />
                        </ListItemButton>

                        <ListItemButton
                            disabled={disabled}
                            onClick={handleDeletePost} >

                            <ListItemIcon>
                                <DeleteOutlineIcon />
                            </ListItemIcon>

                            <ListItemText primary='Delete post' />
                        </ListItemButton>




                    </List>
                </Collapse>

                <CardMedia
                    component="img"
                    height="300"
                    image={post.selectedFile}
                    alt='anime picture'


                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.title}

                    </Typography>
                </CardContent>
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
                    <IconButton aria-label='comment' sx={{ marginLeft: '4px' }} onClick = {()=>{
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
                        <ExpandMoreIcon />



                    </ExpandMore>


                </CardActions>
                <Stack direction='column' ml={2} spacing={1}>
                    <Typography variant='body2' fontWeight={600} sx={{ color: '#262626' }}>{post.likes.length} likes</Typography>
                    <Box>

                        <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{post.name}</Typography>
                        <Typography variant='body2' fontWeight={400} sx={{ color: 'gray', display: 'inline-block' }}>{post.message}</Typography>
                    </Box>

                    <Typography variant='body2' fontWeight={400} sx={{ color: 'gray' }}>{`View all ${post.comments.length} comments`}</Typography>
                    <Box>
                        {
                            post.comments.length > 10 && (
                                
                                  previewComment.map(comment =>
                                        <Box key = {comment.commentId}>
        
                                            <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{comment.name}</Typography>
                                            <Typography variant='body2' fontWeight={400} sx={{ color: 'gray', display: 'inline-block' }}>{comment.content}</Typography>
                                            <br></br>
        
                                        </Box>
        
                                    )
                                
                            )




                          
                        }
                    </Box>
                </Stack>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%', margin: '16px 8px' }}>

                    <TextField
                        value={commentData}
                        ref={commentRef}
                        id="input-with-icon-textfield"
                        label="Comment"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        sx={{ width: '80%' }}
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

                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {post.message}
                        </Typography>
                    </CardContent>

                </Collapse>



            </Card>

            {/* Log Edit the post */}
            <FormLog
                title='Change your post .'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}

            >
                <Form currentId={post._id} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} openPopup={openPopup} />
            </FormLog>

            {/* Open modal detail Post  */}
        <ModalDetailPost  key = {post._id} likeAction = {likeAction}  setLikeAction = {setLikeAction} openDetailPost = {openDetailPost} setOpenDetailPost = {setOpenDetailPost} post ={post} user = {user}   />




        </>
    )
}
export default Post
