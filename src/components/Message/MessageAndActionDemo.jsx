import { IconButton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CallIcon from '../../image/CallIcon'
import InforIcon from '../../image/InforIcon'
import VideoCallIcon from '../../image/VideoCallIcon'
import useStyles from './styles'

const MessageAndActionDemo = () => {
    const classes = useStyles()
    return (
        <Stack

            flexDirection='column'
            sx={{
                width: '60%',
                height: 'inherit',
                position: 'relative'






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
                        marginLeft: '40px'





                    }}


                >
                </Stack>

                {/* Icon Button call , video call , infor User  */}
                <Stack direction='row'>
                    {/* call */}
                    <IconButton>
                        <CallIcon width={24} height={24} />

                    </IconButton>
                    {/* video call */}
                    <IconButton>
                        <VideoCallIcon width={24} height={24} />

                    </IconButton>
                    {/* infor user */}
                    <IconButton>
                        <InforIcon width={24} height={24} />
                    </IconButton>

                </Stack>


            </Box>
            {/* content message */}
            <Box className='flex-center-row' sx={{ width: '100%', height: '400px', display: 'flex' }}>
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