import {IconButton, Stack, Typography} from '@mui/material'
import {Box} from '@mui/system'
import React, {useContext, useLayoutEffect, useState} from 'react'
import CallIcon from '../../image/CallIcon'
import InforIcon from '../../image/InforIcon'
import VideoCallIcon from '../../image/VideoCallIcon'
import useStyles from './styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ConversationContext} from './Message'

const MessageAndActionDemo = () => {
    const classes = useStyles()
    const setAppearComponent = useContext(ConversationContext).setAppearComponent
    const appearComponent = useContext(ConversationContext).appearComponent
    const [appear, setAppear] = useState('inline-block')
    useLayoutEffect(() => {
        if (!appearComponent) {
            setAppear('inline-block')
        } else {
            setAppear('none')
        }


    }, [appearComponent])

    return (
        <Stack

            flexDirection='column'
            sx={{
                width: {lg: '60%', md: '60%', sm: '60%', xs: '100%'},
                height: 'inherit',
                position: 'relative',
                display: {lg: 'inline-block', md: 'inline-block', sm: 'inline-block', xs: `${appear}`}


            }}>
            {/* title */}
            <Box className={classes.header}
                 sx={{

                     justifyContent: 'space-between!important'

                 }}

            >
                {/* Avartar Box */}
                <Stack
                    flexDirection='row'
                    sx={{
                        marginLeft: '0px'


                    }}


                >
                    {/* click to back */}
                    <IconButton sx={{
                        display: {
                            lg: 'none!important',
                            md: 'none!important',
                            sm: 'none!important',
                            xs: 'inline-block'
                        }
                    }} onClick={() => {
                        setAppearComponent(true)
                    }}>
                        <ArrowBackIcon sx={{color: '#262626'}}/>
                    </IconButton>
                </Stack>

                {/* Icon Button call , video call , infor User  */}
                <Stack direction='row'>
                    {/* call */}
                    <IconButton>
                        <CallIcon width={24} height={24}/>

                    </IconButton>
                    {/* video call */}
                    <IconButton>
                        <VideoCallIcon width={24} height={24}/>

                    </IconButton>
                    {/* infor user */}
                    <IconButton>
                        <InforIcon width={24} height={24}/>
                    </IconButton>

                </Stack>


            </Box>
            {/* content message */}
            <Box className='flex-center-row'
                 sx={{width: '100%', height: {lg: '400px', md: '400px', sm: '400px', xs: '544px'}, display: 'flex'}}>
                <Box>
                    <Typography
                        variant='h5'

                    >Open Your conversation</Typography>


                </Box>

            </Box>
            {/* input message */}
            <Stack sx={{
                position: 'absolute',
                bottom: '16px',
                width: '100%',
                display: 'flex',
            }}>


            </Stack>

        </Stack>

    )
}

export default MessageAndActionDemo