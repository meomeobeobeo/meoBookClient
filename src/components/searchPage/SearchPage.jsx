import {Box, Container, IconButton, Stack} from '@mui/material'
import React, {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import useStyles from './styles'
import SearchResult from './SearchResult';
import {useNavigate} from 'react-router-dom'

const SearchPage = () => {
    const [searchText, setSearchText] = useState('')
    const classes = useStyles()
    const navigate = useNavigate()


    return (
        <Container sx={{
            display: {lg: 'none', md: 'none', sm: 'none', xs: 'flex'},
            flexDirection: 'column',
            marginTop: '70px'
        }}>
            {/* input search  */}

            <Stack
                direction='row'
                sx={{
                    position: 'relative',
                    width: '100%',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #ccc',
                    padding: '12px 0'

                }}
            >
                {/* back Icon navigate home */}
                <IconButton onClick={() => {
                    navigate('/', {replace: true})
                }}>
                    <ArrowBackIcon width={24} height={24}/>
                </IconButton>
                {/* input seach text */}
                <Box className={classes.inputBox}>
                    <input
                        value={searchText}
                        className={classes.inputSearch}

                        placeholder='Search'
                        onChange={(e) => {

                            setSearchText(e.target.value)
                        }}
                        style={{}}

                    />
                </Box>
                {/* search Icon button */}
                <IconButton>
                    <SearchIcon width={24} height={24}/>
                </IconButton>


            </Stack>

            {/* search result */}
            <Box sx={{
                marginTop: '8px',
                width: '100%',
            }}>
                <SearchResult searchText={searchText}/>

            </Box>


        </Container>
    )
}

export default SearchPage