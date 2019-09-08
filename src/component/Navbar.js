import React from 'react'

import Logo from '../assets/logo.png'

import './Navbar.css'

function Navbar({ history }) {

    function handleLogOut() {
        localStorage.clear()
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-color">
            <span className="navbar-brand"><img src={Logo} alt='logo' /></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse  navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => history.push('/')}>Home</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => history.push('/history')}>History</span>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" onClick={handleLogOut}>Log out</span>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar
