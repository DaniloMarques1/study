import React,{ useState } from 'react'

import SimpleNavbar from '../component/SimpleNavbar'
import Loader from '../component/Loader'

import api from '../services/api'


import './Login.css'

function Login( {history} ){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState('')
    const [loader, setLoader] = useState(false)

    document.title = "Login";

    function save(token) {
        localStorage.setItem('token', `Bearer ${token}`)
    }

    async function handleLogin(event) {
        event.preventDefault()
        setLoader(true)
        try {
            const response = await api.post('/logar', {
                email : email,
                password : password,
             });
            setLoader(false)  
            save(response.data['token'])
            history.push('/')
        }
        catch(e) {
            setLoader(false)  
            setAlert('Email and/or password incorrect!')
        } 
                    
    }

    return(
        <main>
            <SimpleNavbar />
            <Loader show={loader} />
            <div className='containerDiv'>
                <form onSubmit={handleLogin} className="login-form">
                    <div className='form-items'>
                        { alert.length > 0 ? <div className='alert alert-danger' role='alert'>
                            {alert}
                        </div> : ''}
                        <div className="form-group">
                            <label>E-mail</label>
                            <input className='form-control' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="youremail@domain.com" required type='email' />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className='form-control' onChange={(e) => setPassword(e.target.value)} required placeholder="*******" type='password' />
                        </div>
                        <span className='form' onClick={() => history.push('/register')}>Sign up</span>
                        <button className='btn' type="submit">Sign in</button>
                    </div>
                </form>
            </div>
        </main>

    );
}

export default Login