import {Avatar, BottomNavigation, BottomNavigationAction} from '@mui/material'
import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom';
import {UserContext} from '../../App';
import CreatePostIcon from '../../image/CreatePostIcon';
import HomeIconUnActive from '../../image/HomeIconUnActive';
import LikeUnactive from '../../image/LikeUnactive';
import SearchIcon from '../../image/SearchIcon';
import Form from '../Form/Form';
import FormLog from '../Form/FormLog';

const BottomNavigateion = ({currentId, setCurrentId}) => {
    const [value, setValue] = React.useState('recents');
    const [openPopup, setOpenPopup] = useState(false)

    const user = useContext(UserContext).user

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <BottomNavigation
                sx={{
                    width: '100%',
                    display: {lg: 'none', md: 'none', sm: 'none', xs: 'flex'},
                    position: 'fixed',
                    bottom: '0px',
                    backgroundColor: '#ddd',
                    zIndex: 9000,


                }}
                value={value}
                onChange={handleChange}>
                <BottomNavigationAction
                    LinkComponent={'/'}
                    component={Link}
                    to={'/'}
                    label="Home"
                    value="home"
                    icon={<HomeIconUnActive width={24} height={24}/>}
                />
                <BottomNavigationAction
                    LinkComponent={'/search'}
                    component={Link}
                    to={'/search'}
                    label="Search"
                    value="search"
                    icon={<SearchIcon width={24} height={24}/>}
                />
                <BottomNavigationAction

                    label="Post"
                    value="post"
                    onClick={() => {
                        setOpenPopup(!openPopup)
                    }}
                    icon={<CreatePostIcon width={24} height={24}/>}
                />
                <BottomNavigationAction label="Likes" value="likes" icon={<LikeUnactive width={24} height={24}/>}/>
                <BottomNavigationAction component={Link} to={`/profile/${user?.user?._id}`} label="Avatar"
                                        value="avatar"
                                        icon={< Avatar sx={{width: 24, height: 24}} src={user?.user?.avatarUrl}/>}/>

            </BottomNavigation>


            {/* Form log to create post */}
            <FormLog
                title='Create new post .'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}

            >
                <Form currentId={currentId} setCurrentId={setCurrentId} setOpenPopup={setOpenPopup}
                      openPopup={openPopup}/>
            </FormLog>
        </div>
    )
}

export default BottomNavigateion