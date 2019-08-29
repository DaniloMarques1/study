import React,{ useState } from 'react'

import SimpleNavbar from '../component/SimpleNavbar'

import api from '../services/api'

import './Login.css'

function Login( {history} ){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState('')

    function save(token) {
        localStorage.setItem('token', `Bearer ${token}`)
    }

    async function handleLogin(event) {
        event.preventDefault()
        try {
            const response = await api.post('/logar', {
                email : email,
                password : password,
             });
            save(response.data['token'])
            history.push('/index')
        }
        catch(e) {
            setAlert('Email and/or password incorrect!')
        }
               
    }

    return(
        <main>
            <SimpleNavbar />
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
                    <span onClick={() => history.push('/register')}>Sign up</span>
                    <button className='btn' type="submit">Sign in</button>
                </div>
            </form>
        </main>

    );
}

export default Login