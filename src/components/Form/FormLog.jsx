import React from 'react'
import { Typography, IconButton, Modal, Backdrop, Fade, Box } from '@mui/material'
import { AiOutlineClose } from 'react-icons/ai'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { lg: '60%', md: '60%', sm: '70%', xs: '100%' },
  height: { lg: '70%', md: '70%', sm: '70%', xs: '100%' },
  bgcolor: 'background.paper',
  p: 4,
  overflow: 'auto'

};

const FormLog = (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  const handleClose = () => {
    setOpenPopup(false);
  }
  return (
    <>



      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPopup}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openPopup}>
          <Box sx={style}>
            <Box sx={{

              display: 'flex',
              justifyContent: 'space-between',
              p: 2,
            }}>
              <Typography variant="h6" color="gray">{title}</Typography>
              <IconButton sx={{ marginLeft: '100px', marginTop: '-24px', marginRight: '-24px' }} onClick={() => {
                setOpenPopup(!openPopup);
              }}>
                <AiOutlineClose />
              </IconButton>
            </Box>
            <Box>
              {children}
            </Box>

          </Box>
        </Fade>
      </Modal>















    </>
  )
}

export default FormLog