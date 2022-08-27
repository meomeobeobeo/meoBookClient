import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'
import { Container, Grow, Stack, Box, Avatar, Typography, } from '@mui/material'
import Posts from '../Posts/Posts'

import StoriesHome from '../Stories/StoriesHome'
import Catsvg from '../../image/Catsvg'


const Home = ({ currentId, setCurrentId, user }) => {


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPosts())// getdata from server and save to redux store 
    }, [dispatch])


    return (
        <Container maxWidth='md' sx={{ marginTop: '80px', padding: '0 0' }} >

            <Grow in>
                <Container sx={{ padding: '4px 4px' }}>
                    <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='flex-start'  >



                        <Box sx={
                            {
                                width: { lg: '60%', md: '60%', xs: '100%' },
                                mt: 2,



                            }
                        }>

                            {/* Stories  */}
                            <StoriesHome user={user} ></StoriesHome>



                            <Posts setCurrentId={setCurrentId} />

                        </Box>


                        <Box
                            sx={{
                                width: { lg: '40%', md: '40%', xs: '0%' },
                                display: { lg: 'block', md: 'block', xs: 'none' },
                                marginLeft: '32px!important',
                                mt: '20px!important',





                            }}
                        >
                            {user && (<Stack direction='row' spacing={2}>
                                <Avatar sx={{ width: 60, height: 60 }} src={user?.user.avatarUrl}>

                                </Avatar>
                                <Typography variant='body2' fontWeight={600} sx={{ color: '#111', paddingTop: '16px' }} >{user.user.name}</Typography>
                                <Typography variant='body2' fontWeight={600} sx={{ paddingTop: '16px' }} color='primary'>Switch</Typography>

                            </Stack>)}
                            <Typography variant='body2' fontWeight={550} sx={{ color: '#ccc', marginTop: '40px' }} >Suggestion For you.</Typography>




                            <Typography variant='body2' fontWeight={400} sx={{ color: '#ccc', marginTop: '40px' }} >@2022 MeoMeo Production.</Typography>

                        </Box>


                    </Stack>


                </Container>
            </Grow>

            <Box sx={{ position: 'relative', bottom: '0', width: '100%', marginTop: '50px', display: { lg: 'block', md: 'block', sm: 'block', xs: 'block' } }}>
                <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={2} >
                    <Box sx={{ width: 24, height: 24, color: 'gray' }}>
                        <Catsvg style={{ width: 24, height: 24 }} />
                    </Box>
                    <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
                </Stack>
            </Box>
        </Container>

    )
}

export default Home;