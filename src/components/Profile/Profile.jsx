    import { Avatar, Box, Button, Container, Fade,  IconButton, Modal, Stack, Typography } from '@mui/material'

    import React, { useState } from 'react'
    import { useDispatch, useSelector } from 'react-redux'
    import meoLike from '../../image/meoLike.jpg'
    import SettingsIcon from '@mui/icons-material/Settings'
    import PostSvg from '../../image/PostSvg'
    import SaveSvg from '../../image/SaveSvg'
    import TagedSvg from '../../image/TagedSvg'
    import useStyles from './styles'
    import Backdrop from '@mui/material/Backdrop';
    import { updateAvatar } from '../../actions/userInfor'
    import FileBase64 from '../../FileBase64'
    import {useNavigate} from 'react-router-dom'

import PreviewPost from './PreviewPost'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs : '360px' , sm : '400px' , md : '400px' , lg : '400px'},
    height: '336px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 0,
    textAlign: 'center',
   

};
const styleConfirmUpload = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs : '360px' , sm : '400px' , md : '400px' , lg : '400px'},
    height: '188px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: 0,
    textAlign: 'center',
   


};





///main Profile exported
const Profile = ({ user , setUser}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [dataImg , setDataImg] = useState(null)
    const [mouseDown1, setMouseDown1] = useState(false)
    const [mouseDown2, setMouseDown2] = useState(false)
    const [mouseDown3, setMouseDown3] = useState(false)
    const [mouseDown4, setMouseDown4] = useState(false)
    const [mouseDown5, setMouseDown5] = useState(false)
    const [mouseDown7, setMouseDown7] = useState(false)


    const [opConfirmUpLoad, setOpConfirmUpLoad] = useState(false)
  


    
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChangeAvartar = () => {
        dispatch(updateAvatar({navigate : navigate ,_id : user.user._id , formData:{dataImg : dataImg}}))
        setOpConfirmUpLoad(false)
    }

    const classes = useStyles()
    const status = {
        postBtn: true,
        saveBtn: false,
        taggedBtn: false,
    }

    const [activeStatus, setActiveStatus] = useState(status)
    const posts = useSelector(state => state.posts.posts)
    const currentUserPosts = posts.filter((post) => {
        return post.authorId === user.user._id
    })
    console.log(currentUserPosts)



    

    return (
        <Container sx={{ marginTop: '80px', minHeight: '90vh'}} >
            <Stack direction='row' spacing={0} flexWrap='wrap' sx={{ borderBottom: '2px solid #ccc' }} >
                <Box sx={{
                    padding: 4,
                    flexGrow: 1,
                }}
                    onClick={handleOpen}
                >
                    <Avatar sx={{
                        width: 150,
                        height: 150,
                        margin: 'auto'





                    }} src={user.user.avatarUrl} />

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
                        <Typography variant="h6" color="gray">{user.user.name}</Typography>
                        <Button variant='outlined' color='inherit' sx={{
                            textTransform: 'none',
                            fontSize: '14px',
                            border: '1px solid gray',
                            padding: '4px 8px 4px 8px',
                            height: '32px',
                            fontWeight: 'bold',
                            color: 'gray'


                        }}>Edit profile</Button>
                        <IconButton sx={{ padding: 0 }} >
                            <SettingsIcon sx={{ fontSize: '32px' }} />
                        </IconButton>

                    </Stack>
                    <Box>
                        <Typography variant='body1' fontWeight={500} color='gray' >Make friends<span style={{ marginLeft: '8px' }}>{user.user.friendList.length}</span></Typography>
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
                activeStatus.postBtn && <PreviewPost currentUserPosts={currentUserPosts} />
            }
            {/* footer */}

            {/* Model Avatar setting */}
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
                    <Stack sx={style} direction='column' spacing={2}  >
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{ pt: 4 }}

                        >
                            <Avatar src={meoLike} sx={{ width: 56, height: 56, margin: 'auto' }}>

                            </Avatar>
                            <Typography variant="h6" fontWeight='600' sx={{ color: '#111', fontSize: '18px' }}>Upload new profile photo</Typography>
                            <Typography variant='body2' color='gray' >Meo meo</Typography>




                        </Stack>
                        <Stack direction="column" spacing={0} justifyContent='space-between'  >

                            <label htmlFor="icon-button-file">
                                {/* <Input accept="image/*" id="icon-button-file" type="file" sx={{ display: 'none' }} onChange={handleUploadAvatar} /> */}
                                <FileBase64 sx = {{display : 'none'}} id = 'icon-button-file' onDone={({ base64 }) => {
                                    
                                    setDataImg(base64)
                                    setOpen(false)
                                    setOpConfirmUpLoad(true)
                                    
                                    }}    />

                                <Typography color='primary' className={mouseDown1 ? classes.pressModal : classes.modal} fontWeight='bold' fontSize={14} onMouseUp={() => { setMouseDown1(false) }} onMouseDown={() => { setMouseDown1(true) }}>Upload photo</Typography>


                            </label>



                            <Typography color='gray' className={mouseDown2 ? classes.pressModal : classes.modal} onMouseUp={() => { setMouseDown2(false) }} onMouseDown={() => { setMouseDown2(true) }} fontWeight={400} fontSize={14}>Manage Sync Settings</Typography>

                            <Typography color='error' className={mouseDown3 ? classes.pressModal : classes.modal} onMouseUp={() => { setMouseDown3(false) }} onMouseDown={() => { setMouseDown3(true) }} fontWeight='bold' fontSize={14}>Remove current photo</Typography>
                            <Typography color='gray' className={mouseDown4 ? classes.pressModal : classes.modal} onMouseUp={() => { setMouseDown4(false) }} onMouseDown={() => { setMouseDown4(true) }} onClick={handleClose} fontWeight='bold' fontSize={14}>Cancel</Typography>

                        </Stack>
                    </Stack>
                </Fade>
            </Modal>


            {/* Moldal confirm upLoad Avatar */}


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={opConfirmUpLoad}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={opConfirmUpLoad}>
                    <Stack sx={styleConfirmUpload} direction='column' spacing={2}  >
                        <Stack
                            direction='column'
                            spacing={1}
                            sx={{ pt: 4 }}

                        >
                            <Typography variant="h6" fontWeight='600' sx={{ color: '#111', fontSize: '18px' }}>Your profile photo will also change . </Typography>
                            <Typography variant='body2' color='gray' >Meo meo</Typography>




                        </Stack>
                        <Stack direction="column" spacing={0} justifyContent='space-between'  >





                            <Typography  color='primary' className={mouseDown5 ? classes.pressModal : classes.modal} onMouseUp={() => { setMouseDown5(false) }} onMouseDown={() => { setMouseDown5(true) }} fontWeight= 'bold' fontSize={14} onClick={() =>{
                                handleChangeAvartar()
                              
                                }}          >OK</Typography>
                            <Typography color='gray' className={mouseDown7 ? classes.pressModal : classes.modal} onMouseUp={() => { setMouseDown7(false) }} onMouseDown={() => { setMouseDown7(true) }} onClick={()=>{setOpConfirmUpLoad(false)}} fontWeight='bold' fontSize={14}>Cancel</Typography>

                        </Stack>
                    </Stack>
                </Fade>
            </Modal>





        </Container>
    )
}

export default Profile