import {Stack} from '@mui/material'
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
    return (
        <Stack alignContent='center' justifyContent='center' sx={{width: '100%', height: '100vh'}}>
            <CircularProgress/>

        </Stack>
    )
}

export default Loader