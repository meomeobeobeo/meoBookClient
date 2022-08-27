import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import * as api from '../../api/index'
import { Avatar, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const SearchResult = ({ searchText  }) => {
    const currentUser = useContext(UserContext).user
    const [userResults, setUserResults] = useState([])


    useEffect(() => {
        // call api to get result of search 
        if(searchText){
        const res = api.filterUser(searchText)
        res
            .then((doc) => {
                setUserResults(doc.data)

            })

        }
        



    }, [searchText])


    if((userResults.length === 0) || !searchText){
        return (
            <Typography variant='h5' fontWeight={600} sx={{ color: '#262626' }}>No result find.</Typography>
        )

    }

    return (
        <Stack direction='column' sx={{ width: '100%', height: 'auto', marginTop: '16px' }}>
            {
                userResults.map((user, index) => {
                    let linkToProfile = currentUser?.user?._id === user?._id ? `/profile/${currentUser?.user._id}` : `/userProfile/${user?._id}`

                    return (
                        <Stack
                            key={user._id}
                            
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
                            <Avatar src={user?.avatarUrl} sx={{ width: 24, height: 24 }} aria-label="recipe">

                            </Avatar>
                            <Typography variant='body2' fontWeight={600} sx={{ color: '#262626', display: 'inline-block', paddingRight: '8px' }}>{user?.name}</Typography>
                        </Stack>
                    )

                })
            }

        </Stack>

    )
}

export default SearchResult