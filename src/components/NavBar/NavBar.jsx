import  { useEffect } from 'react';
import useStyles from './styles'
import { AppBar, Avatar, IconButton, Toolbar, Typography, Box, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { RiMessengerFill, RiMessengerLine } from 'react-icons/ri'
import { IoCompassOutline, IoCompassSharp } from 'react-icons/io5'
import { AiFillHeart, AiOutlineHeart, AiOutlineHome, AiFillHome, AiOutlineLogin, AiOutlineProfile } from 'react-icons/ai'
import { IoCreateOutline, IoCreateSharp } from 'react-icons/io5'


import FormLog from '../Form/FormLog';

import { useDispatch } from 'react-redux';


import Form from '../Form/Form';
import { authSlice } from '../../redux/authSlice';
import { useLocation, useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchComponent from './SearchComponent';




const NavBar = ({ currentId, setCurrentId, user, setUser }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const classes = useStyles()

   




    const [openPopup, setOpenPopup] = useState(false)


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')))
      


    }, [location])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const statusNavBar = {
        homeIconActive: true, messageIconActive: true, createIconActive: true,
        likeIconActive: true, compassIconActive: true
    }
    const [activeIcon, setActiveIcon] = useState(statusNavBar)


    return (
        // 
        <>
            <AppBar className={classes.appBar}>

                <Toolbar sx = {{
                    width:{
                        lg:'76%',
                        sm : '90%',
                        xs : '90%'
                    
                        

                    }
                }} className={classes.toolBar} >

                    <Typography variant="h6" className={classes.title} component={Link} to='/' >MeowBook</Typography>
                    <SearchComponent/>
                    <Box className={classes.iconBar}>
                        {/* home icon */}
                        <IconButton component={Link} to='/' onClick={() => {
                            setActiveIcon({
                                ...statusNavBar, homeIconActive: !statusNavBar.homeIconActive
                            })
                        }} >
                            {activeIcon.homeIconActive ? <AiOutlineHome /> : <AiFillHome />}
                        </IconButton >


                        {/* messenger icon */}
                        <IconButton component={Link} to='/message' onClick={
                            () => {
                                setActiveIcon({
                                    ...statusNavBar, messageIconActive: !statusNavBar.messageIconActive
                                })
                            }

                        } >
                            {activeIcon.messageIconActive ? <RiMessengerLine /> : <RiMessengerFill />}
                        </IconButton >


                        {/* Create post icon */}
                        <IconButton onClick={() => {
                            setActiveIcon({

                                ...statusNavBar,
                                createIconActive: !statusNavBar.createIconActive
                            })

                            setOpenPopup(!openPopup)

                        }} >
                            {activeIcon.createIconActive ? <IoCreateOutline /> : <IoCreateSharp />}
                        </IconButton >
                        {/* compass icon  */}
                        <IconButton onClick={() => {
                            setActiveIcon({
                                ...statusNavBar,
                                compassIconActive: !statusNavBar.compassIconActive
                            })

                        }} >
                            {activeIcon.compassIconActive ? <IoCompassOutline /> : <IoCompassSharp />}
                        </IconButton >


                        {/* heart icon */}
                        <IconButton onClick={() => {
                            setActiveIcon({
                                ...statusNavBar,
                                likeIconActive: !statusNavBar.likeIconActive
                            })
                        }} >
                            {activeIcon.likeIconActive ? <AiOutlineHeart /> : <AiFillHeart />}
                        </IconButton >

                        {/* log in log out and user  */}


                       
                        {


                            user ? (
                                <>
                                    {/* <Button

                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                    >
                                        <Avatar sx={{ width: 36, height: 36 , bgcolor :purple[500] }} src={user.user.avatarUrl } alt={user.user.name} >{user.user.name[0]}</Avatar>
                                    </Button> */}
                                    {/* <Menu

                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}>

                                        <MenuList>
                                            <MenuItem component={Link} to={`/profile/${user.user._id || 'undifine'}`} onClick = {handleClose} >
                                                <ListItemIcon>
                                                    <AiOutlineProfile />
                                                </ListItemIcon>
                                                <ListItemText>User Profile.</ListItemText>

                                            </MenuItem>

                                            <MenuItem>
                                                <ListItemIcon>
                                                    <BsFillPersonFill />
                                                </ListItemIcon>
                                                <ListItemText>{user.user.name}.</ListItemText>

                                            </MenuItem>


                                            <MenuItem onClick={() => {
                                                navigate('/', { replace: true })
                                                handleClose()
                                                dispatch(authSlice.actions.logOut())
                                               

                                            }}>
                                                <ListItemIcon>
                                                    <AiOutlineLogout />
                                                </ListItemIcon>
                                                <ListItemText>Log out.</ListItemText>

                                            </MenuItem>
                                        </MenuList>

                                    </Menu> */}
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }} src={user.user.avatarUrl}>M</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                minWidth: 200,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem component={Link} to={`/profile/${user.user._id || 'undifine'}`} onClick={handleClose}>
                                            <ListItemIcon>
                                                <AiOutlineProfile />
                                            </ListItemIcon>
                                            <ListItemText>  Profile.</ListItemText>
                                        </MenuItem>

                                        <Divider />

                                        <MenuItem>
                                            <ListItemIcon>
                                                <SaveAltIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Saved
                                            </ListItemText>
                                        </MenuItem>

                                        <MenuItem>
                                            <ListItemIcon>
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            Settings
                                        </MenuItem>

                                        <MenuItem
                                            component={Link} 
                                            to='/auth'
                                            onClick={() => {
                                                navigate('/', { replace: true })
                                                handleClose()
                                                dispatch(authSlice.actions.logOut())


                                            }}>
                                            <ListItemIcon>
                                                <SwitchAccountIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText>
                                                Switch Accounts
                                            </ListItemText>
                                        </MenuItem>

                                        <Divider />
                                        <MenuItem

                                            onClick={() => {
                                                navigate('/', { replace: true })
                                                handleClose()
                                                dispatch(authSlice.actions.logOut())


                                            }}

                                        >
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <IconButton component={Link} to='/auth' variant='contained' color='primary' onClick={() => {
                                    setActiveIcon({
                                        homeIconActive: true, messageIconActive: true, createIconActive: true,
                                        likeIconActive: true, compassIconActive: true
                                    })
                                }}>
                                    <AiOutlineLogin />

                                </IconButton>
                            )
                        }





                    </Box>

                </Toolbar>






            </AppBar>



            {/* Form log to create post */}
            <FormLog
                title='Create new post .'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}

            >
                <Form currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup} openPopup={openPopup} />
            </FormLog>
        </>
    )
}
export default NavBar