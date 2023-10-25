import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import useStyles from './styles';
import { Avatar, Paper, Typography, Button, Grid, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import { signin, signup } from '../../actions/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const Auth = () => {
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [formWidth, setFormWidth] = useState(0);
    const [formData, setFormData] = useState(initialState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formRef = useRef(null);

    const handleResize = useCallback(() => {
        setFormWidth(formRef.current.offsetWidth);
    }, []);

    useEffect(() => {
        document.addEventListener('DOMContentLoaded', handleResize);
        window.addEventListener('resize', handleResize);
        return () => {
            document.removeEventListener('DOMContentLoaded', handleResize);
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        setFormWidth(formRef.current.offsetWidth);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleShowPassword = () => {
        setIsPasswordShown(!isPasswordShown)
    };

    const switchMode = () => {
        setIsSignup(!isSignup);
        setIsPasswordShown(false);
    }

    const googleSuccess = async (response) => {
        const decoded = jwt_decode(response.credential);
        const { name, picture, sub } = decoded;

        const userData = {
            _id: sub,
            type: 'user',
            name: name,
            image: picture,
        }

        try {
            dispatch({ type: 'AUTH', data: { data: { ...userData }, token: response.credential, } });

            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log('Google Sign In Failed. Try Again Later');
        console.log(error);
    }

    return (
        <Container
            component='main'
            maxWidth='xs'
        >
            <Paper
                className={classes.paper}
                elevation={3}
            >
                <Avatar
                    className={classes.avatar}
                >
                    <LockOutlinedIcon />
                </Avatar>

                <Typography
                    variant='h5'
                >
                    {isSignup
                        ? 'Sign Up'
                        : 'Sign In'
                    }
                </Typography>

                <form
                    ref={formRef}
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Grid
                        container
                        spacing={2}
                    >
                        {isSignup && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    isHalf
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    isHalf
                                />
                            </>
                        )}

                        <Input
                            name='email'
                            label='Email'
                            handleChange={handleChange}
                            type='email'
                        />

                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={
                                isPasswordShown
                                    ? 'text'
                                    : 'password'
                            }
                            handleShowPassword={handleShowPassword}
                        />

                        {isSignup
                            && <Input
                                name='confirmPassword'
                                label='Repeat Password'
                                handleChange={handleChange}
                                type={
                                    isPasswordShown
                                        ? 'text'
                                        : 'password'
                                }
                            />
                        }
                    </Grid>

                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isSignup
                            ? 'Sign Up'
                            : 'Sign In'
                        }
                    </Button>

                    <GoogleLogin
                        width={formWidth}
                        onSuccess={googleSuccess}
                        onError={googleFailure}
                        cookiePolicy='single_host_origin'
                    />

                    <Grid
                        container
                        justifyContent='flex-end'
                    >
                        <Grid item>
                            <Button
                                onClick={switchMode}
                            >
                                {isSignup
                                    ? 'Already have an account? Sign In'
                                    : `Don't have an account? Sign Up`
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
