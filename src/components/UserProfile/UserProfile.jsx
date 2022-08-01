
import { Avatar, Box, Container, IconButton, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SettingsIcon from '@mui/icons-material/Settings'
import PostSvg from '../../image/PostSvg'
import SaveSvg from '../../image/SaveSvg'
import TagedSvg from '../../image/TagedSvg'
import useStyles from './styles'

import { useParams } from 'react-router-dom'
import UserPreviewPost from './UserPreviewPost'
import * as api from '../../api'
import Loader from '../Loader'
import { followUser } from '../../actions/userInfor'







const UserProfile = ({ currentUser }) => {








    const posts = useSelector(state => state.posts.posts)
    const [currentUserPosts, setcurrentUserPosts] = useState([])
    let { userId } = useParams();
    const [user, setUser] = useState(null)
    const [isFollow, setIsFollow] = useState(false)
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

                }
                else {
                    setIsFollow(false)
                }
                console.log(isFollow)


            })



    }, [userId, posts, currentUser?.user?.friendList])
   











    const dispatch = useDispatch()


    const handleFollow = () => {
        dispatch(followUser(user?._id))
        setIsFollow(!isFollow)

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
                <Loader />
            </>
        )
    }










    return (
        <>
            <Container sx={{ marginTop: '80px', minHeight: '90vh' }} >
                <Stack direction='row' spacing={0} flexWrap='wrap' sx={{ borderBottom: '2px solid #ccc' }} >
                    <Box sx={{
                        padding: 4,
                        flexGrow: 1,
                    }}

                    >
                        <Avatar sx={{
                            width: 150,
                            height: 150,
                            margin: 'auto'





                        }} src={user.avatarUrl} />

                    </Box>
                    {/* user Infor */}
                    <Box display='flex' flexDirection='column' sx={{
                        flexGrow: 2,
                        mt: 4,


                    }} >
                        <Stack direction='row' spacing={2} sx={{
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent :{ lg :'flex-start',md :'flex-start',sm:'flex-start' , xs :'center'}



                        }} >
                            <Typography variant="h6" color="gray">{user.name}</Typography>
                            <Box sx = {{width:'100px', height:'32px'}}>
                            {
                                !isFollow ? (
                                    <Box onClick={() => { handleFollow() }} sx={{
                                        textTransform: 'none',
                                        fontSize: '14px',
                                        display: 'flex',
                                        justifyContent: 'center',

                                        padding: '0px 24px 0px 24px',
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
                                        <Typography color="inherit" fontSize='14px' fontWeight={500} sx={{ margin: 'auto' }}>Follow</Typography>
                                    </Box>
                                ) : (
                                    <Box onClick={() => { handleFollow() }} sx={{
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
                                        <Typography color="inherit" fontSize='14px' fontWeight={500} sx={{ margin: 'auto' }}>UnFollow</Typography>
                                    </Box>
                                )
                            }

                            </Box>



                            <IconButton sx={{ padding: 0 }} >
                                <SettingsIcon sx={{ fontSize: '32px' }} />
                            </IconButton>

                        </Stack>
                        <Box>
                            <Typography variant='body1' fontWeight={500} color='gray' >Make friends<span style={{ marginLeft: '8px' }}>{user.friendList.length}</span></Typography>
                        </Box>




                    </Box>

                </Stack>




                {/* preview user post  */}
                <Stack direction='row' spacing={3} color='gray' justifyContent='center' mt={0} mb={2}   >
                    <Box sx={{ pt: 1, paddingRight: '8px' }} className={activeStatus.postBtn && classes.activeStatus} onClick={() => {
                        setActiveStatus({
                            postBtn: true,
                            saveBtn: false,
                            taggedBtn: false,

                        })
                    }}  >
                        <PostSvg />
                        <Typography variant='button' color='inherit' sx={{ display: 'inline-block', fontSize: '14px' }}  >POSTS</Typography>
                    </Box>
                    <Box
                        sx={{ pt: 1, paddingRight: '8px' }}
                        onClick={() => {
                            setActiveStatus({
                                postBtn: false,
                                saveBtn: true,
                                taggedBtn: false,
                            })
                        }}
                        className={activeStatus.saveBtn && classes.activeStatus} >
                        <SaveSvg />
                        <Typography variant='button' color='inherit' sx={{ display: 'inline-block', fontSize: '14px' }}   >SAVE</Typography>
                    </Box>
                    <Box
                        sx={{ pt: 1, paddingRight: '8px' }}
                        onClick={() => {
                            setActiveStatus({
                                postBtn: false,
                                saveBtn: false,
                                taggedBtn: true,
                            })
                        }}
                        className={activeStatus.taggedBtn && classes.activeStatus}   >
                        <TagedSvg />
                        <Typography variant='button' color='inherit' sx={{ display: 'inline-block', fontSize: '14px' }}>TAGGED</Typography>
                    </Box>
                </Stack>
                {/* List image */}
                {
                    activeStatus.postBtn && <UserPreviewPost currentUserPosts={currentUserPosts} />
                }









            </Container>


        </>

    )
}

export default UserProfile