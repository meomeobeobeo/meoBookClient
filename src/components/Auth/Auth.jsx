import React, {useEffect, useState} from 'react'
import {Avatar, Box, Button, Container, Grid, Paper, Stack, TextField, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles'
import Input from './Input'
import {GoogleLogin} from 'react-google-login'
import {gapi} from 'gapi-script';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {authSlice} from '../../redux/authSlice'
import {signIn, signUp} from '../../actions/auth'
import {blue} from '@mui/material/colors'
import Catsvg from '../../image/Catsvg';


// import {} from 'react-google-lo'

const intitialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

function Auth({currentId, setCurrentId}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(intitialState)

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: '1054340077074-ii0gr96blkp0o9fnp8a1uej8hg7t0ct0.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }, []);


    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()
    const [isSignUp, setIsSignUp] = useState(true);


    const handleSetSign = () => {
        setIsSignUp(!isSignUp)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isSignUp) {
            dispatch(signIn({formData, navigate}))


        } else {
            dispatch(signUp({formData, navigate}))


        }


    }

    const handleChange = (e) => {

        setFormData({...formData, [e.target.name]: e.target.value})


    }
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }


    const googleSuccess = async (res) => {
        const user = res?.profileObj
        const tokenId = res?.tokenId
        const data = {
            user: user,
            tokenId: tokenId

        }


        try {
            dispatch(authSlice.actions.auth(data))
            dispatch()

        } catch (error) {
            console.log(error)
        }

        navigate('/', {replace: true})


    }
    const googleFailure = (error) => {
        console.error(error)
    }


    return (
        <Container component="main" maxWidth='xs' sx={{minHeight: '60vh'}}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar} sx={{
                    color: 'red',
                    bgcolor: blue[200]

                }}>
                    <LockOutlinedIcon/>

                </Avatar>
                <Typography variant='h5'>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} align="center">
                        {isSignUp && (
                            <>
                                <Grid item xs={12}>
                                    <TextField name='firstName' label='First Name' variant='outlined'
                                               onChange={handleChange} type="text" autoFocus fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='lastName' label='Last Name' variant='outlined'
                                               onChange={handleChange} type="text" fullWidth/>

                                </Grid>

                            </>

                        )}

                        <Input name='email' label="Email Address" variant='outlined' onChange={handleChange} half
                               type='email'/>
                        <Input name='password' label="Password" variant='outlined' onChange={handleChange} half
                               handleShowPassword={handleShowPassword} type={showPassword ? 'text' : 'password'}/>

                        {!isSignUp && (
                            <>
                                <Typography sx={{
                                    marginTop: '16px',
                                    marginLeft: '16px',
                                }}
                                            color='primary'

                                >If you don't have account </Typography>

                                <Button
                                    color="error"
                                    sx={{
                                        textTransform: 'none',
                                        marginTop: '8px',

                                    }}
                                    size="medium"
                                    onClick={handleSetSign}


                                >Sign Up.</Button>
                            </>
                        )}

                        {
                            isSignUp && (
                                <>
                                    <Input name='confirmPassword' label="Repeat Password" variant='outlined'
                                           onChange={handleChange} handleShowPassword={handleShowPassword}
                                           type={showPassword ? 'text' : 'password'}/>

                                    <Typography sx={{
                                        marginTop: '16px',
                                        marginLeft: '16px',
                                    }}
                                                color='primary'

                                    >If you have account </Typography>

                                    <Button
                                        color="error"
                                        sx={{
                                            textTransform: 'none',
                                            marginTop: '8px',

                                        }}
                                        size="medium"
                                        onClick={handleSetSign}


                                    >Sign In.</Button>
                                </>
                            )


                        }

                    </Grid>
                    <GoogleLogin
                        clientId='1054340077074-ii0gr96blkp0o9fnp8a1uej8hg7t0ct0.apps.googleusercontent.com'
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} color='primary' variant='contained' fullWidth
                                    className={classes.googleButton} disabled={renderProps.disabled}>Login with
                                Google</Button>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                        className={classes.googleButton}
                    />

                    <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}
                            sx={{marginTop: '12px'}}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>

                </form>

            </Paper>

            <Box sx={{
                position: 'relative',
                bottom: '0',
                width: '100%',
                marginTop: '12px',
                display: {lg: 'block', md: 'block', sm: 'block', xs: 'block'}
            }}>
                <Stack direction='row' spacing={2} justifyContent='center' mt={10} mb={2}>
                    <Box sx={{width: 24, height: 24, color: 'gray'}}>
                        <Catsvg style={{width: 24, height: 24}}/>
                    </Box>
                    <Typography variant="body2" display='inline-block' color="gray">Meo Meo production.</Typography>
                </Stack>
            </Box>

        </Container>
    )
}

export default Auth