import {useEffect, useState} from 'react';
import {Avatar, Button, ButtonGroup, IconButton, Paper, Stack, TextField, Typography,} from '@mui/material'
import FileBase64 from '../../FileBase64'
import useStyles from './styles'
import {useDispatch, useSelector} from 'react-redux'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import {FcAddImage} from 'react-icons/fc'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import {MdDateRange} from 'react-icons/md'
import {createPost, editPost} from '../../actions/posts'
import {Link} from 'react-router-dom';
import {Box} from '@mui/system';
import {styled} from '@mui/styles';
import meoLike from '../../image/meoLike.jpg'


const UserBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px'

})

const Form = ({currentId, setCurrentId, setOpenPopup, openPopup}) => {


    const classes = useStyles()
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
        authorAvatarUrl: meoLike,
    })

    const post = useSelector(state => (currentId ? state.posts.posts.find(data => data._id === currentId) : null));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [hidden, setHidden] = useState(true)


    useEffect(() => {

        if (post) {
            setPostData(post);


        } else {
            setPostData({
                creator: '',
                title: '',
                message: '',
                tags: '',
                selectedFile: '',
            })
        }

    }, [post])


    const dispatch = useDispatch()
    // clear the post data in form
    const clear = () => {
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        })

        setCurrentId(0)
    }

    // submit action in form

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (currentId === 0 || !currentId) {

            dispatch(createPost({
                ...postData,
                name: `${user?.user?.name}`,
                authorAvatarUrl: `${user?.user?.avatarUrl}`
            }));
            clear();
        } else {

            dispatch(editPost({
                currentId: currentId,
                postData: {...postData, name: `${user?.user?.name}`, authorAvatarUrl: `${user?.user?.avatarUrl}`}
            }));

            clear();


        }

    }


    // if no notifications
    if (!user) {
        return <>
            <Paper className={classes.paper}>
                <Typography component={Link} to={'/auth'} variant="h6" align="center" sx={{
                    textDecoration: 'none'
                }}>
                    Please Sign in to create a new post.
                </Typography>
            </Paper>

        </>
    }


    return (


        <Box bgcolor='white' p={3} sx={{}}>
            <UserBox>
                <Avatar src={meoLike} sx={{width: 30, height: 30}}/>
                <Typography fontWeight={500} variant='span'>{user.user.name}</Typography>
            </UserBox>
            <form onSubmit={handleSubmit}>

                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={3}
                    placeholder='what on your mind ?'
                    variant="standard"
                    fullWidth
                    name='message'
                    value={postData.message}
                    onChange={(e) => {


                        setPostData({...postData, message: e.target.value})
                    }
                    }

                />
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={2}
                    placeholder='#hashtag'
                    variant="standard"
                    fullWidth
                    name='tags'
                    value={postData.tags}
                    onChange={(e) => {


                        setPostData({...postData, tags: e.target.value.split(',')})
                    }

                    }
                />
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={2}
                    placeholder='topic'
                    variant="standard"
                    fullWidth
                    value={postData.title}
                    onChange={(e) => {

                        setPostData({...postData, title: e.target.value})

                    }}
                />
                <Stack direction='row' gap={1} mt={2} mb={2}>
                    <IconButton sx={{p: 0}}>
                        <EmojiEmotionsIcon color='warning'/>

                    </IconButton>
                    <IconButton sx={{p: 0}} onClick={() => {
                        setHidden(!hidden);
                    }}>


                        <label htmlFor="form-post">
                            <FileBase64
                                sx={{display: 'none'}}
                                id='form-post'
                                type="file"
                                multiple={false}
                                onDone={({base64}) => setPostData({...postData, selectedFile: base64})}

                            />
                            <FcAddImage fontSize={24}/>
                        </label>


                    </IconButton>

                    <IconButton sx={{p: 0}}>
                        <VideoCameraBackIcon color='success'/>

                    </IconButton>


                </Stack>
                <ButtonGroup fullWidth variant="contained" color='primary'>
                    <Button type="submit" onClick={() => {
                        setOpenPopup(!openPopup)
                    }}>Submit</Button>
                    <Button sx={{width: '100px'}}>
                        <MdDateRange/>
                    </Button>

                </ButtonGroup>

            </form>

        </Box>

    )
}
export default Form
