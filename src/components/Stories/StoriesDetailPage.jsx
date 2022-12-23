import {Box, Typography} from '@mui/material';
import React, {useEffect} from 'react'
import Stories, {WithSeeMore} from 'react-insta-stories'


const CustomStoryContent = ({story, action}) => {
    return <WithSeeMore story={story} action={action}>
        <div>
            <h1>Hello!</h1>
            <p>This story would have a 'See More' link at the bottom ✨</p>
        </div>
    </WithSeeMore>
}
const Content = ({action, isPaused}) => {
    useEffect(() => {
        setTimeout(() => {
            action('pause');
            setTimeout(() => {
                action('play');
            }, 2000);
        }, 2000);
    }, []);
    return (
        <div style={{background: 'pink', padding: 20}}>
            <h1 style={{marginTop: '100%', marginBottom: 0}}>🌝</h1>
            <h1>{isPaused ? 'Paused' : 'Playing'}</h1>
        </div>
    );

}


const StoriesDetailPage = () => {
    const stories = [
        {
            url: 'image/3800a551-43d4-4860-8387-ad8724191932.jpeg',
            duration: 5000,
            header: {
                heading: 'Mohit Karekar',
                subheading: 'Posted 30m ago',
                profileImage: 'https://picsum.photos/100/100',
            },
        },
        {
            url: 'file:///E:/MUSIC_MP4/yt1s.com%20-%20DAOKO%20%20米津玄師打上花火MUSIC%20VIDEO.mp4',
            duration: 5000, // ignored
            type: 'video',
        },
        {
            url: 'image/3800a551-43d4-4860-8387-ad8724191932.jpeg',
            duration: 5000,
            header: {
                heading: 'Mohit Karekar',
                subheading: 'Posted 30m ago',
                profileImage: 'https://picsum.photos/100/100',
            },
            seeMore: ({close}) => {
                return <Box onClick={close}>
                    <Typography variant='body2' color='primary'>Click to close</Typography>
                </Box>;
            },
        }


    ];
    return (
        <Box sx={{
            marginTop: '60px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Box
                sx={{
                    width: {lg: "30%", md: "50%", sm: '60%', xs: "100%"},
                }}

            >
                <Stories
                    stories={stories}
                    defaultInterval={1500}
                    width={'100%'}
                    height={700}
                    loop={true}
                >

                </Stories>
            </Box>


        </Box>
    )
}

export default StoriesDetailPage