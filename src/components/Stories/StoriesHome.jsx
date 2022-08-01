import styled from '@emotion/styled';
import { Avatar, Badge, IconButton, Stack } from '@mui/material'
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import React from 'react'
import FileBase64 from '../../FileBase64';



const StoriesHome = ({ user }) => {

    // use use Effect call api to get user follow id 

    return (
        <div>
            <Stack
                direction='row'

                alignItems='center'
                spacing={2}
                sx={{
                    backgroundColor: '#fff',
                    width: '100%',
                    boxShadow: 'none',
                    border: '1px solid #ccc',
                    height: '100px',
                    marginBottom: '28px',
                    borderRadius: '4px',
                    overflow :'auto'


                }}>

                <label htmlFor="updateStories" >
                    <FileBase64
                        sx={{ display: 'none' }}
                        id='updateStories'
                        type="file"
                        multiple={false}
                        onDone={() => { 

                        }}

                    />
                    <Badge
                        color="primary"
                        overlap="circular"
                        badgeContent={'+'}

                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        sx={{
                            marginLeft: '12px',
                            "&:hover": {
                                opacity: 0.7
                            }


                        }}
                    >

                        <Avatar sx={{ width: 56, height: 56 }} src={user?.user?.avatarUrl} />

                    </Badge>

                </label>




            </Stack>
        </div>
    )
}

export default StoriesHome