import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import History from './pages/History'
import Main from './pages/Main'


export default function Routes() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <Route path='/history' exact component={History} />
            <Route path='/' exact component={Main} />   
        </BrowserRouter>
    );
}