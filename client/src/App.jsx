import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {

    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <NavBar />
                <Routes>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/' element={<Home />} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App
