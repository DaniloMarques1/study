import React,{ useState } from 'react'



import SimpleNavbar from '../component/navbar'

import './Login.css'

function Login( {history} ){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function inputEmail(e) {
        setEmail(e.target.value)
    }

    function inputPassword(e) {
        setPassword(e.target.value)
    }


    function handleLogin() {
        console.log(email, password);
    }

    return(
        <div className="container">
            <SimpleNavbar />
            <form className="login-form">
                <div className='form-items'>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input onChange={inputEmail} value={email} placeholder="youremail@domain.com" required type='email' />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={inputPassword} required placeholder="*******" type='password' />
                    </div>
                    <button onClick={handleLogin} type="button">Sign in</button>
                </div>
            </form>
        </div>

    );
}

export default Login