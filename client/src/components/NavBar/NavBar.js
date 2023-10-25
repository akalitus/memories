import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memories from '../../assets/images/memories.png';
import decode from 'jwt-decode';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        navigate('/');
    }, [dispatch, navigate]);

    const isTokenExpired = useCallback(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            return decodedToken.exp * 1000 < new Date().getTime();
        }
        return false;
    }, [user]);

    useEffect(() => {
        if (isTokenExpired()) {
            logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography
                    component={Link}
                    to='/'
                    className={classes.heading}
                    variant='h2'
                    align='center'
                >
                    Memories
                </Typography>

                <img className={classes.image} src={memories} alt='memories' height='60' />
            </div>

            <Toolbar className={classes.toolbar}>
                {user
                    ? (
                        <div className={classes.profile}>
                            <Avatar
                                className={classes.purple}
                                alt={user.data.name}
                                src={user.data.image}
                            >
                                {user.data.name.charAt(0)}
                            </Avatar>

                            <Typography
                                className={classes.name}
                                variant='h6'
                            >
                                {user.data.name}
                            </Typography>

                            <Button
                                variant='contained'
                                className={classes.logout}
                                color='secondary'
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    )
                    : (
                        <Button
                            component={Link}
                            to='/auth'
                            variant='contained'
                            color='primary'
                        >
                            Sign In
                        </Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
