import {Avatar, Box, ClickAwayListener, Paper, Stack, Typography} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import * as api from '../../api/index'
import {UserContext} from '../../App';
import {Link} from 'react-router-dom';

const SearchResults = ({searchText, setOpen}) => {
    const currentUser = useContext(UserContext).user
    const [userResults, setUserResults] = useState([])


    useEffect(() => {
        // call api to get result of search 
        const res = api.filterUser(searchText)
        res
            .then((doc) => {
                setUserResults(doc.data)

            })


    }, [searchText])


    return (
        <Paper
            sx={{
                position: 'absolute',
                top: '31px',
                right: '-44px',
                width: '360px',
                height: '360px',
                overflow: 'auto',


                zIndex: 10000000,
                mt: 1.5,
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


            }}
        >
            <Stack direction='column' sx={{width: '100%', height: 'auto', marginTop: '16px'}}>
                {
                    userResults.map((user, index) => {
                        let linkToProfile = currentUser?.user?._id === user?._id ? `/profile/${currentUser?.user._id}` : `/userProfile/${user?._id}`

                        return (
                            <Stack
                                key={user._id}
                                onClick={() => {
                                    setOpen(false)
                                }}
                                component={Link}
                                to={`${linkToProfile}`}

                                direction='row'
                                sx={{
                                    marginLeft: '12px',
                                    padding: '4px 0px 4px 12px',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    borderBottom: '1px solid #ccc',
                                    textDecoration: 'none'
                                }}
                                spacing={1}


                            >
                                <Avatar src={user?.avatarUrl} sx={{width: 24, height: 24}} aria-label="recipe">

                                </Avatar>
                                <Typography variant='body2' fontWeight={600} sx={{
                                    color: '#262626',
                                    display: 'inline-block',
                                    paddingRight: '8px'
                                }}>{user?.name}</Typography>
                            </Stack>
                        )

                    })
                }

            </Stack>


        </Paper>
    )


}

const SearchComponent = ({sx}) => {
    const [searchText, setSearchText] = useState('')

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box
                className='search-component'
                sx={{position: 'relative', display: {lg: 'flex', md: 'flex', sm: 'flex', xs: 'none'}}}
            >

                <input
                    value={searchText}
                    className='search-component'
                    placeholder='Search'
                    onChange={(e) => {

                        setSearchText(e.target.value)
                    }}
                    onClick={(e) => {
                        // event forcus this search 
                        handleClick()

                    }}

                    style={{}}

                />
                {
                    open ? (

                        <SearchResults setOpen={setOpen} searchText={searchText}/>

                    ) : null
                }


            </Box>
        </ClickAwayListener>

    )
}

export default SearchComponent