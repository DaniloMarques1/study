import React from 'react'

import './SimpleNavbar.css'
import Logo from '../assets/logo.png'

function SimpleNavbar() {
    return (
        <nav>
            <img src={Logo} alt="Logo" />
        </nav>
       
    );
}

export default SimpleNavbar