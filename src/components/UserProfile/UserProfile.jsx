import {Avatar, Box, Container, Stack, Typography} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostSvg from '../../image/PostSvg'
import SaveSvg from '../../image/SaveSvg'
import TagedSvg from '../../image/TagedSvg'
import useStyles from './styles'

import {useNavigate, useParams} from 'react-router-dom'
import UserPreviewPost from './UserPreviewPost'
import * as api from '../../api'
import Loader from '../Loader'
import {followUser} from '../../actions/userInfor'
import FriendIcon from '../../image/FriendIcon'
import ArrowMore from '../../image/ArrowMore'
import {UserContext} from '../../App'
import Catsvg from '../../image/Catsvg'


const UserProfile = ({currentUser}) => {


    const posts = useSelector(state => state.posts.posts)
    const [currentUserPosts, setcurrentUserPosts] = useState([])
    let {userId} = useParams();
    const [user, setUser] = useState(null)
    const [isFollow, setIsFollow] = useState(false)
    const authUser = useContext(UserContext).user
    const navigate = useNavigate()
    useEffect(() => {
        const data = api.getUserData(userId)
        data
            .then((userData) => {
                setUser(userData.data)
                const currentUserPosts = posts.filter((post) => {
                    return post.authorId === userData.data._id
                })
                setcurrentUserPosts(currentUserPosts)
                const find = currentUser?.user?.friendList.find(id => id === userData.data._id)
                if (find) {
                    setIsFollow(true)

                } else {
                    setIsFollow(false)
                }


            })


    }, [userId, posts, currentUser?.user?.friendList])


    const dispatch = useDispatch()


    const handleFollow = () => {
        dispatch(followUser(user?._id))
        setIsFollow(!isFollow)

    }

    const handleCreateConversation = async () => {
        let _id = authUser?.user?._id
        let userId = {
            senderId: authUser?.user?._id,
            receiverId: user?._id
        }

        const {data} = await api.createNewConversation(_id, userId)


    }


    const classes = useStyles()
    const status = {
        postBtn: true,
        saveBtn: false,
        taggedBtn: false,
    }

    const [activeStatus, setActiveStatus] = useState(status)


    if (!user) {
        return (
            <>
                <Loader/>
            </>
        )
    }


    return (
        <>
            <Container sx={{marginTop: '80px', minHeight: '90vh'}}>

                <Stack direction='row' spacing={0} flexWrap='wrap' sx={{borderBottom: '2px solid #ccc'}}>
                    <Box sx={{
                        padding: 4,
                        flexGrow: 1,
                    }}

                    >
                        <Avatar sx={{
                            width: 150,
                            height: 150,
                            margin: 'auto'


                        }} src={user.avatarUrl}/>

                    </Box>
                    {/* user Infor */}
                    <Box display='flex' flexDirection='column' sx={{
                        flexGrow: 2,
                        mt: 4,


                    }}>
                        <Stack direction='row' spacing={3} sx={{
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: {lg: 'flex-start', md: 'flex-start', sm: 'flex-start', xs: 'center'}


                        }}>
                            <Typography variant="h6" color="gray">{user.name}</Typography>
                            {/* action */}
                            <Stack
                                direction='row'
                                spacing={1}
                                sx={{
                                    textAlign: 'center',
                                    alignItems: 'center',
                                    justifyContent: {lg: 'flex-start', md: 'flex-start', sm: 'flex-start', xs: 'center'}


                                }}
                            >
                                <Box sx={{width: '80px', height: '32px'}}>
                                    <Box
                                        onClick={() => {
                                            handleCreateConversation()
                                            navigate('/message', {replace: true})


                                        }}
                                        sx={{
                                            textTransform: 'none',
                                            fontSize: '14px',
                                            display: 'flex',
                                            justifyContent: 'center',

                                            padding: '0px 12px 0px 12px',
                                            height: '32px',
                                            fontWeight: 'bold',
                                            color: '#262626',
                                            backgroundColor: '#fff',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            cursor: 'pointer',
                                            "&:hover": {
                                                opacity: 0.8
                                            }


                                        }}>
                                        <Typography color="inherit" fontSize='14px' fontWeight={500}
                                                    sx={{margin: 'auto'}}>Message</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{width: '80px', height: '32px'}}>
                                    {
                                        !isFollow ? (
                                            <Box onClick={() => {
                                                handleFollow()
                                            }} sx={{
                                                textTransform: 'none',
                                                fontSize: '14px',
                                                display: 'flex',
                                                justifyContent: 'center',

                                                padding: '0px 12px 0px 12px',
                                                height: '32px',
                                                fontWeight: 'bold',
                                                color: '#fff',
                                                backgroundColor: '#0095f6',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                "&:hover": {
                                                    opacity: 0.5
                                                }


                                            }}>
                                                <Typography color="inherit" fontSize='14px' fontWeight={500}
                                                            sx={{margin: 'auto'}}>Follow</Typography>
                                            </Box>
                                        ) : (
                                            <Box onClick={() => {
                                                handleFollow()
                                            }} sx={{
                                                textTransform: 'none',
                                                fontSize: '14px',
                                                display: 'flex',
                                                justifyContent: 'center',

                                                padding: '0px 24px 0px 24px',
                                                height: '32px',
                                                fontWeight: 'bold',
                                                color: 'gray',
                                                backgroundColor: '#fff',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                "&:hover": {
                                                    opacity: 0.5,

                                                }


                                            }}>
                                                <Box sx={{margin: 'auto'}}>
                                                    <FriendIcon width={20} height={15}/>
                                                </Box>
                                            </Box>
                                        )
                                    }


                                </Box>
                                <Box sx={{
                                    width: '40px',
                                    height: '32px',
                                    textTransform: 'none',
                                    fontSize: '14px',
                                    display: 'flex',
                                    justifyContent: 'center',


                                    fontWeight: 'bold',
                                    color: 'gray',
                                    backgroundColor: '#fff',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}>
                                    <Box sx={{margin: 'auto'}}>
                                        <ArrowMore width={12} height={12}/>
                                    </Box>
                                </Box>

                            </Stack>


                        </Stack>
                        <Box>
                            <Typography variant='body1' fontWeight={500} color='gray'>Make friends<span
                                style={{marginLeft: '8px'}}>{user.friendList.length}</span></Typography>
                        </Box>


                    </Box>

                </Stack>


                {/* preview user post  */}
                <Stack direction='row' spacing={3} color='gray' justifyContent='center' mt={0} mb={2}>
                    <Box sx={{pt: 1, paddingRight: '8px'}} className={activeStatus.postBtn && classes.activeStatus}
                         onClick={() => {
                             setActiveStatus({
                                 postBtn: true,
                                 saveBtn: false,
                                 taggedBtn: false,

                             })
                         }}>
                        <PostSvg/>
                        <Typography variant='button' color='inherit'
                                    sx={{display: 'inline-block', fontSize: '14px'}}>POSTS</Typography>
                    </Box>
                    <Box
                        sx={{pt: 1, paddingRight: '8px'}}
                        onClick={() => {
                            setActiveStatus({
                                postBtn: false,
                                saveBtn: true,
                                taggedBtn: false,
                            })
                        }}
                        className={activeStatus.saveBtn && classes.activeStatus}>
                        <SaveSvg/>
                        <Typography variant='button' color='inherit'
                                    sx={{display: 'inline-block', fontSize: '14px'}}>SAVE</Typography>
                    </Box>
                    <Box
                        sx={{pt: 1, paddingRight: '8px'}}
                        onClick={() => {
                            setActiveStatus({
                                postBtn: false,
                                saveBtn: false,
                                taggedBtn: true,
                            })
                        }}
                        className={activeStatus.taggedBtn && classes.activeStatus}>
                        <TagedSvg/>
                        <Typography variant='button' color='inherit'
                                    sx={{display: 'inline-block', fontSize: '14px'}}>TAGGED</Typography>
                    </Box>
                </Stack>
                {/* List image */}
                {
                    activeStatus.postBtn && <UserPreviewPost currentUserPosts={currentUserPosts}/>
                }


            </Container>
            <Box sx={{
                position: 'relative',
                bottom: '0',
                width: '100%',
                marginTop: '50px',
                display: {lg: 'block', md: 'block', sm: 'block', xs: 'block'}
            }}>
                <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={2}>
                    <Box sx={{width: 24, height: 24, color: 'gray'}}>
                        <Catsvg style={{width: 24, height: 24}}/>
                    </Box>
                    <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
                </Stack>
            </Box>


        </>

    )
}

export default UserProfile