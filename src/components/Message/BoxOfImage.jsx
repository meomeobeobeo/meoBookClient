import {Backdrop, Fade, IconButton, Modal, Typography} from '@mui/material';
import {Box} from '@mui/system'
import React from 'react'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg: '82%', md: '82%', sm: '100%', xs: '100%'},
    height: {lg: '84%', md: '84%', sm: '100%', xs: '100%'},
    borderRadius: {lg: '20px', md: '20px', sm: '0px', xs: '0px'},


    bgcolor: 'background.paper',

};

const BoxOfImage = ({imgData}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Box
                onClick={handleOpen}

                sx={{
                    width: '200px',
                    height: '115px',
                    backgroundImage: `url(${imgData})`,
                    backgroundClip: 'border-box',
                    backgroundSize: 'cover',
                    margin: '8px 12px 8px 12px',
                    borderRadius: '16px',
                }}
            >

            </Box>
            {/* modal image */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box
                            sx={{
                                boxShadow: 'none',
                                width: '100%',
                                display: {xs: 'block', sm: 'block', md: 'none', lg: 'none'},
                                borderBottom: '1px solid #ccc',
                                backgroundColor: '#ccc',
                                padding: 1,

                            }}
                            onClick={handleClose}
                        >
                            <IconButton aria-label="settings">
                                <Typography variant='body2' fontWeight='600' color='primary'>Exit</Typography>
                            </IconButton>

                        </Box>
                        <img className="img-message" style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '20px',
                            objectFit: 'cover'
                        }} src={imgData} alt={'meomeo'}/>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default BoxOfImage